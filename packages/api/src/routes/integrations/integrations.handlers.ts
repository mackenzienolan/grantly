import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import type { AppRouteHandler } from "../../lib/types";

import { db, integrationsTable } from "@grantly/db";
import { getAuth } from "@hono/clerk-auth";
import { eq } from "drizzle-orm";
import type {
  IntegrationsDeleteRoute,
  IntegrationsListRoute,
  IntegrationsRetrieveRoute,
} from "./integrations.routes";

export const integrationRetrieve: AppRouteHandler<IntegrationsRetrieveRoute> = async (c) => {
  const auth = getAuth(c);

  const orgId = auth?.orgId;
  const userId = Number(auth?.sessionClaims?.["external_id"]);

  if (!auth || !userId || !orgId) {
    return c.json({ message: HttpStatusPhrases.UNAUTHORIZED }, HttpStatusCodes.UNAUTHORIZED);
  }

  const { id } = c.req.valid("param");

  try {
    const integration = await db.query.integrationsTable.findFirst({
      where: (prod, { eq, and }) => and(eq(prod.id, Number(id)), eq(prod.teamId, orgId)),
    });

    if (!integration) {
      return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
    }

    return c.json(
      {
        message: "Integration retrieved",
        // data: { integration }
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

export const integrationsList: AppRouteHandler<IntegrationsListRoute> = async (c) => {
  const auth = getAuth(c);

  const orgId = auth?.orgId;
  const userId = Number(auth?.sessionClaims?.["external_id"]);

  if (!auth || !userId || !orgId) {
    return c.json({ message: HttpStatusPhrases.UNAUTHORIZED }, HttpStatusCodes.UNAUTHORIZED);
  }

  const { type, status } = c.req.valid("query");

  try {
    const integrationResults = await db.query.integrationsTable.findMany({
      where: (prod, { eq, and }) =>
        and(
          eq(prod.teamId, orgId),
          type ? eq(prod.type, type) : undefined,
          status ? eq(prod.status, status) : undefined
        ),
    });

    console.log(integrationResults);

    return c.json(
      {
        message: "Integrations list",
        data: {
          integrations: integrationResults,
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

export const integrationsDelete: AppRouteHandler<IntegrationsDeleteRoute> = async (c) => {
  const auth = getAuth(c);

  const orgId = auth?.orgId;
  const userId = Number(auth?.sessionClaims?.["external_id"]);

  if (!auth || !userId || !orgId) {
    return c.json({ message: HttpStatusPhrases.UNAUTHORIZED }, HttpStatusCodes.UNAUTHORIZED);
  }

  const { id } = c.req.valid("param");

  try {
    const integration = await db.query.integrationsTable.findFirst({
      where: (prod, { eq, and }) => and(eq(prod.id, id), eq(prod.teamId, orgId)),
    });

    if (!integration) {
      console.log("DDSDJSDJSDSDJSJDSJDSJDJS");
      c.var.logger.info("Integration not found", { id, teamId: orgId });
      return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
    }

    await db.delete(integrationsTable).where(eq(integrationsTable.id, id));

    return c.json({ message: HttpStatusPhrases.OK }, HttpStatusCodes.OK);
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
