import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import type { AppRouteHandler } from "../../lib/types";

import { db } from "@grantly/db";
import { featuresTable } from "@grantly/db/schema";
import { getAuth } from "@hono/clerk-auth";
import { ZodError } from "zod";
import type { CreateFeatureRoute, FeaturesListRoute } from "./features.routes";
import { nanoid } from "nanoid";

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

export const createFeature: AppRouteHandler<CreateFeatureRoute> = async (c) => {
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
    const { name, description, type, quota, resetPeriod, key } =
      c.req.valid("json");

    const featuresInsert = {
      uid: nanoid(),
      name,
      description,
      teamId: orgId,
      key,
      type,
      quota,
      resetPeriod,
    } satisfies typeof featuresTable.$inferInsert;
    const feature = await db
      .insert(featuresTable)
      .values(featuresInsert)
      .returning({
        uid: featuresTable.uid,
      });

    return c.json(
      {
        message: "Feature created",
        feature: {
          id: feature[0].uid,
        },
      },
      HttpStatusCodes.CREATED
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
