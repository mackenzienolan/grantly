import pino from "pino";
import { Resource } from "sst";

export const logger = pino({
  transport:
    Resource.App.stage !== "main"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        }
      : undefined,
});

export const createLogger = (module: string) =>
  logger.child({
    module,
  });
