import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import type { AppRouteHandler } from "../../lib/types";

import { db } from "@grantly/db";
import { featuresTable } from "@grantly/db/schema";
import { getAuth } from "@hono/clerk-auth";
import { ZodError } from "zod";
import type { ListCustomersRoute, GetCustomerRoute } from "./customers.routes";

export const listCustomers: AppRouteHandler<ListCustomersRoute> = async (c) => {
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
    const customerResults = await db.query.customersTable.findMany({
      where: (cust, { eq, and }) => and(eq(cust.teamId, orgId)),
    });

    return c.json(
      {
        message: "Customers list",
        data: {
          customers: customerResults,
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

export const getCustomer: AppRouteHandler<GetCustomerRoute> = async (c) => {
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
    const { id } = c.req.valid("param");

    const customer = await db.query.customersTable.findFirst({
      where: (cust, { eq }) => eq(cust.externalId, id),
    });

    if (!customer) {
      return c.json(
        { message: "Customer not found" },
        HttpStatusCodes.NOT_FOUND
      );
    }

    return c.json(
      {
        message: "Customer",
        data: { customer },
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
