import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import type { AppRouteHandler } from "../../lib/types";

import { db } from "@grantly/db";
import { getAuth } from "@hono/clerk-auth";
import type { FeaturesListRoute } from "./features.routes";

export const featuresList: AppRouteHandler<FeaturesListRoute> = async (c) => {
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
    const featureResults = await db.query.featuresTable.findMany({
      where: (feat, { eq, and }) => and(eq(feat.teamId, orgId)),
    });

    return c.json(
      {
        message: "Features list",
        data: {
          features: featureResults,
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
