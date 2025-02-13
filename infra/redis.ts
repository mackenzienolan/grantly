export const redis = new upstash.RedisDatabase("redis", {
  databaseName: "grantly",
  region: "us-east-1",
});
