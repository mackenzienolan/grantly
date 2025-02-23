export const vpc = new sst.aws.Vpc("vpc-postgres");

export const postgres = new sst.aws.Postgres("postgres-v2", {
  vpc,
  dev: {
    username: "postgres",
    password: "password",
    database: "local",
    port: 5432,
  },
});

new sst.x.DevCommand("Studio", {
  link: [postgres],
  dev: {
    directory: "packages/db",
    command: "npx drizzle-kit studio",
  },
});
