import { Redis } from "@upstash/redis";
import { Resource } from "sst";
import { bus } from "sst/aws/bus";

const redis = new Redis({
  url: Resource.REDIS_URL.value,
  token: Resource.REDIS_TOKEN.value,
});

const acquireLock = async (
  lockKey: string,
  token: string,
  ttl: number
): Promise<boolean> => {
  const result = await redis.set(lockKey, token, {
    ex: ttl,
    nx: true,
  });
  return result === "OK";
};

const releaseLockSafely = async (lockKey: string, token: string) => {
  const script = `
      if redis.call("GET", KEYS[1]) == ARGV[1] then
        return redis.call("DEL", KEYS[1])
      else
        return 0
      end
    `;
  await redis.eval(script, [lockKey], [token]);
};

type BusCallback<T> = (
  evt: T,
  raw: Parameters<ReturnType<typeof bus.subscriber>>[0]
) => Promise<void>;

export function withIdempotency<
  T extends { metadata: { idempotencyKey: string } },
>(callback: BusCallback<T>): BusCallback<T> {
  return async function (evt, raw) {
    const lockKey = `lock:${evt.metadata.idempotencyKey}`;
    const lockToken = Math.random().toString(36).substring(7); // Unique token per process
    const ttl = 10;

    const lockAcquired = await acquireLock(lockKey, lockToken, ttl);

    if (!lockAcquired) {
      console.log(`Skipping duplicate event: ${evt.metadata.idempotencyKey}`);
      return;
    }
    try {
      console.log(`Processing event: ${evt.metadata.idempotencyKey}`);
      await callback(evt, raw);
    } finally {
      await releaseLockSafely(lockKey, lockToken);
    }
  };
}
