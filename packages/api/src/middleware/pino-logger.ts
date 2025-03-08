import { pinoLogger as logger } from 'hono-pino';
import pino from 'pino';
import pretty from 'pino-pretty';
import { Resource } from 'sst';

export function pinoLogger() {
  return logger({
    pino: pino(
      {
        level: 'info',
      },
      Resource.App.stage === 'mnolan' ? pretty() : undefined
    ),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}
