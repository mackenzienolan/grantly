import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import type { AppRouteHandler } from "../../../lib/types";

import { db } from "@grantly/db";
import { getAuth } from "@hono/clerk-auth";
import { ZodError } from "zod";
import type {
  ListEntitlementsRoute,
  GetEntitlementRoute,
} from "./entitlements.routes";

export const listEntitlements: AppRouteHandler<ListEntitlementsRoute> = async (
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

  const { id: customerId } = c.req.valid("param");

  try {
    const entitlementResults = await db.query.entitlementsTable.findMany({
      where: (et, { and, eq }) => and(eq(et.customerId, customerId)),
    });

    return c.json(
      {
        message: "Customers entitlements list",
        data: {
          entitlements: entitlementResults,
        },
      },
      HttpStatusCodes.OK
    );
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

export const getEntitlement: AppRouteHandler<GetEntitlementRoute> = async (
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

  try {
    const { id: customerId, entitlementId } = c.req.valid("param");

    const entitlementResult = await db.query.entitlementsTable.findFirst({
      where: (et, { eq, and }) =>
        and(eq(et.customerId, customerId), eq(et.id, Number(entitlementId))),
    });

    if (!entitlementResult) {
      return c.json(
        { message: "Customer entitlement not found" },
        HttpStatusCodes.NOT_FOUND
      );
    }

    return c.json(
      {
        message: "Customer entitlement",
        data: { entitlement: entitlementResult },
      },
      HttpStatusCodes.OK
    );
  } catch (err) {
    c.var.logger.error(err);
    if (err instanceof ZodError) {
      return c.json({ message: err.message }, HttpStatusCodes.BAD_REQUEST);
    }

    return c.json(
      { message: HttpStatusPhrases.INTERNAL_SERVER_ERROR },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
