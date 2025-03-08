import { withIdempotency } from "@/bus/utils/idempotency";
import { createLogger } from "@/utils/logger";
import { customersTable, db, productsTable } from "@grantly/db";
import events from "@grantly/events/core";
import { bus } from "sst/aws/bus";
import Stripe from "stripe";

const logger = createLogger("core.integration.created");

export const handler = bus.subscriber(
  events["integration.created"],
  withIdempotency(async (evt, _raw) => {
    logger.info({ evt }, "Integration created. Running sync.");

    const integration = await db.query.integrationsTable.findFirst({
      where: (i, { eq }) => eq(i.uid, evt.properties.uid),
    });

    if (!integration || !integration.teamId || !integration.accessToken) {
      logger.error(
        { integrationId: evt.properties.id },
        "Integration not found, missing teamId, or missing accessToken"
      );
      return;
    }

    if (integration.type !== "stripe") {
      logger.info({ type: integration.type }, "Not a Stripe integration, skipping sync");
      return;
    }

    // Initialize Stripe client with the integration's access token
    const stripeClient = new Stripe(integration.accessToken);

    try {
      // Sync Products
      logger.info("Starting products sync");
      const products = await stripeClient.products.list();

      for (const product of products.data) {
        const insert = {
          name: product.name,
          externalId: product.id,
          teamId: integration.teamId,
          livemode: product.livemode,
          _raw: product,
        };

        await db
          .insert(productsTable)
          .values(insert)
          .onConflictDoUpdate({
            target: [productsTable.externalId, productsTable.teamId],
            set: insert,
          });
      }
      logger.info({ count: products.data.length }, "Products synced");

      // Sync Customers
      logger.info("Starting customers sync");
      const customers = await stripeClient.customers.list();

      for (const customer of customers.data) {
        const insert = {
          externalId: customer.id,
          teamId: integration.teamId,
          livemode: customer.livemode,
          _raw: customer,
        };

        await db
          .insert(customersTable)
          .values(insert)
          .onConflictDoUpdate({
            target: [customersTable.externalId, customersTable.teamId],
            set: insert,
          });
      }
      logger.info({ count: customers.data.length }, "Customers synced");

      logger.info("Integration sync completed successfully");
    } catch (error) {
      logger.error({ error }, "Error syncing integration data");
      throw error;
    }
  })
);
