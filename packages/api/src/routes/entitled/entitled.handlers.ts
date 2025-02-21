import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import type { AppRouteHandler } from "../../lib/types";

import { db } from "@grantly/db";
import { getAuth } from "@hono/clerk-auth";
import type { GetEntitledRoute } from "./entitled.routes";

export const getEntitled: AppRouteHandler<GetEntitledRoute> = async (c) => {
  const auth = getAuth(c);

  const orgId = auth?.orgId;
  const userId = Number(auth?.sessionClaims?.["external_id"]);

  if (!auth || !userId || !orgId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const { customer_id, feature_key } = c.req.valid("json");

  try {
    const featureDetails = await db.query.featuresTable.findFirst({
      where: (feature, { eq, and }) =>
        and(eq(feature.teamId, orgId), eq(feature.key, feature_key)),
    });

    if (!featureDetails) {
      return c.json(
        { message: "Feature not found" },
        HttpStatusCodes.BAD_REQUEST
      );
    }

    if (featureDetails.deletedAt) {
      return c.json(
        { message: "Feature is archived" },
        HttpStatusCodes.BAD_REQUEST
      );
    }

    const entitlementResult = await db.query.entitlementsTable.findFirst({
      where: (entitlement, { eq, and }) =>
        and(
          eq(entitlement.teamId, orgId),
          eq(entitlement.featureKey, feature_key),
          eq(entitlement.customerId, customer_id)
        ),
    });

    if (!entitlementResult) {
      return c.json(
        { message: "Entitlement not found" },
        HttpStatusCodes.NOT_FOUND
      );
    }

    if (featureDetails.type === "boolean") {
      return c.json(
        {
          entitled: true,
          data: {
            type: "boolean" as const,
            customer_id,
            feature_key,
          },
        },
        HttpStatusCodes.OK
      );
    }

    const quotaLeft = (featureDetails.quota ?? 0) - entitlementResult.quotaUsed;

    const isEntitled = quotaLeft > 0;

    return c.json(
      {
        entitled: isEntitled,
        data: {
          type: featureDetails.type,
          customer_id,
          feature_key,
          quota: featureDetails.quota ?? 0,
          quota_used: entitlementResult.quotaUsed ?? 0,
          quota_remaining: quotaLeft ?? 0,
          resets_at: entitlementResult.resetsAt!,
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
