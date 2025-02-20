import { db } from "@grantly/db";
import { getAuth } from "@hono/clerk-auth";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { AppRouteHandler } from "../../lib/types";
import { UserTeamsRoute } from "./users.routes";

export const userTeams: AppRouteHandler<UserTeamsRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const auth = getAuth(c);

  if (!auth) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  console.log(auth);

  const userId = Number(auth.sessionClaims?.["external_id"]);

  console.log(userId, id);

  if (!userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  if (userId !== Number(id)) {
    return c.json(
      { message: HttpStatusPhrases.FORBIDDEN },
      HttpStatusCodes.FORBIDDEN
    );
  }

  const teams = await db.query.teamMembersTable.findMany({
    where: (tm, { and, eq, isNull }) =>
      and(eq(tm.userId, userId), isNull(tm.deletedAt)),
    with: {
      team: true,
    },
  });

  console.log("hi");

  return c.json(
    {
      message: "User memberships",
      data: { memberships: teams },
    },
    HttpStatusCodes.OK
  );
};
