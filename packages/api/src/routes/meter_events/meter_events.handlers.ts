import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import type { AppRouteHandler } from "../../lib/types";
import { nanoid } from "nanoid";
import { db, entitlementsTable, meterEventsTable } from "@grantly/db";
import { getAuth } from "@hono/clerk-auth";
import type { CreateMeterEventRoute } from "./meter_events.routes";
import { and, eq, sql } from "drizzle-orm";

export const createMeterEvent: AppRouteHandler<CreateMeterEventRoute> = async (
  c
) => {
  const auth = getAuth(c);

  const orgId = auth?.orgId;
  const userId = Number(auth?.sessionClaims?.["external_id"]);

  if (!auth || !userId || !orgId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const { customer_id, feature_key, event_type, amount, event_id } =
    c.req.valid("json");

  try {
    const entitlementResult = await db.query.entitlementsTable.findFirst({
      where: (e, { and, eq }) =>
        and(eq(e.featureKey, feature_key), eq(e.customerId, customer_id)),
    });

    if (!entitlementResult) {
      c.var.logger.warn(
        { event_id, event_type, customer_id },
        "Entitlement not found"
      );
      return c.json(
        { message: "Entitlement not found" },
        HttpStatusCodes.BAD_REQUEST
      );
    }

    const findEventWithId = event_id
      ? await db
          .select({
            count: sql`count(*)`.mapWith(Number),
          })
          .from(meterEventsTable)
          .where(
            and(
              eq(meterEventsTable.eventId, event_id),
              eq(meterEventsTable.teamId, orgId)
            )
          )
      : null;

    if (findEventWithId?.[0]?.count && findEventWithId[0].count > 0) {
      return c.json(
        { message: "Event already exists" },
        HttpStatusCodes.BAD_REQUEST
      );
    }

    await db.transaction(async (tx) => {
      const eventInsert = {
        eventId: event_id ?? `evt_${nanoid()}`,
        eventType: event_type,
        amount,
        featureKey: feature_key,
        customerId: customer_id,
        teamId: orgId,
      } satisfies typeof meterEventsTable.$inferInsert;
      await tx.insert(meterEventsTable).values(eventInsert);

      await tx
        .update(entitlementsTable)
        .set({
          quotaUsed: sql`${entitlementsTable.quotaUsed} + ${amount}`,
        })
        .where(eq(entitlementsTable.uid, entitlementResult.uid));
    });

    return c.json({ message: "Event created" }, HttpStatusCodes.CREATED);
  } catch (err) {
    if (err instanceof Error) {
      return c.json({ message: err.message }, HttpStatusCodes.BAD_REQUEST);
    }
    return c.json(
      { message: HttpStatusPhrases.INTERNAL_SERVER_ERROR },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
