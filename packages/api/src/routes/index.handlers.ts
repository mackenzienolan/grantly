import * as HttpStatusCodes from "stoker/http-status-codes";
import { AppRouteHandler } from "../lib/types";
import { PingRoute } from "./index.routes";

export const ping: AppRouteHandler<PingRoute> = async (c) => {
  return c.json({ message: "Pong" }, HttpStatusCodes.OK);
};
