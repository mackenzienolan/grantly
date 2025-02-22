import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import type { AppRouteHandler } from "../../lib/types";
import { hashKey } from "@grantly/utils/server";
import { eq, and } from "drizzle-orm";
import { db, keysTable } from "@grantly/db";
import { getAuth } from "@hono/clerk-auth";
import type {
  CreateKeyRoute,
  RotateKeyRoute,
  DeleteKeyRoute,
  ListKeysRoute,
} from "./keys.routes";
import { nanoid } from "nanoid";

export const createKey: AppRouteHandler<CreateKeyRoute> = async (c) => {
  const auth = getAuth(c);

  const orgId = auth?.orgId;
  const userId = Number(auth?.sessionClaims?.["external_id"]);

  if (!auth || !userId || !orgId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const { type, description } = c.req.valid("json");

  try {
    const key = `${type === "api_key" ? "api" : "public"}_${nanoid()}`;

    const hashedKey = hashKey(key);

    await db.insert(keysTable).values({
      key: hashedKey,
      type,
      teamId: orgId,
      createdBy: userId,
      description,
    });

    return c.json(
      { message: "Key created", data: { key } },
      HttpStatusCodes.CREATED
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

export const listKeys: AppRouteHandler<ListKeysRoute> = async (c) => {
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
    const keysList = await db.query.keysTable.findMany({
      where: (k, { eq }) => eq(k.teamId, orgId),
    });

    const parsedKeys = keysList.map((k) => ({
      type: k.type,
      description: k.description,
      key: k.type === "api_key" ? k.key : undefined,
    }));

    return c.json(
      { message: "Keys listed", data: { keys: parsedKeys } },
      HttpStatusCodes.OK
    );
  } catch (err) {
    c.var.logger.error(err);

    if (err instanceof Error) {
      return c.json({ message: err.message }, HttpStatusCodes.BAD_REQUEST);
    }

    return c.json(
      { message: HttpStatusPhrases.INTERNAL_SERVER_ERROR },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const deleteKey: AppRouteHandler<DeleteKeyRoute> = async (c) => {
  const auth = getAuth(c);

  const orgId = auth?.orgId;
  const userId = Number(auth?.sessionClaims?.["external_id"]);

  if (!auth || !userId || !orgId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const { id } = c.req.valid("param");

  try {
    await db
      .delete(keysTable)
      .where(and(eq(keysTable.id, Number(id)), eq(keysTable.teamId, orgId)));

    return c.json({ message: "Key deleted" }, HttpStatusCodes.OK);
  } catch (err) {
    c.var.logger.error(err);

    if (err instanceof Error) {
      return c.json({ message: err.message }, HttpStatusCodes.BAD_REQUEST);
    }

    return c.json(
      { message: HttpStatusPhrases.INTERNAL_SERVER_ERROR },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const rotateKey: AppRouteHandler<RotateKeyRoute> = async (c) => {
  const auth = getAuth(c);

  const orgId = auth?.orgId;
  const userId = Number(auth?.sessionClaims?.["external_id"]);

  if (!auth || !userId || !orgId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const { id } = c.req.valid("param");

  try {
    const key = await db.query.keysTable.findFirst({
      where: (k, { eq }) => eq(k.id, Number(id)),
    });

    if (!key) {
      return c.json({ message: "Key not found" }, HttpStatusCodes.NOT_FOUND);
    }

    const newKey = `${key.type === "api_key" ? "api" : "public"}_${nanoid()}`;

    const hashedKey = hashKey(newKey);

    await db
      .update(keysTable)
      .set({
        key: hashedKey,
      })
      .where(eq(keysTable.id, Number(id)));

    return c.json(
      { message: "Key rotated", data: { key: newKey } },
      HttpStatusCodes.OK
    );
  } catch (err) {
    c.var.logger.error(err);

    if (err instanceof Error) {
      return c.json({ message: err.message }, HttpStatusCodes.BAD_REQUEST);
    }

    return c.json(
      { message: HttpStatusPhrases.INTERNAL_SERVER_ERROR },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
