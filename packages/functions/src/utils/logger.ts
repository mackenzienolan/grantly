import pino from "pino";

export const logger = pino();

export const createLogger = (module: string) =>
  logger.child({
    module,
  });
