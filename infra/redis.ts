export const redis = new upstash.RedisDatabase("redis", {
  databaseName: "grantly",
  region: "global",
  primaryRegion: "us-east-1",
  eviction: true,
  tls: true,
});

export const REDIS_URL = new sst.Secret("REDIS_URL", redis.endpoint);
export const REDIS_TOKEN = new sst.Secret("REDIS_TOKEN", redis.restToken);

export const REDIS_SECRETS = [REDIS_URL, REDIS_TOKEN];
