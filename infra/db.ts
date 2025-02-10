export const vpc = new sst.aws.Vpc("vpc");
export const postgres = new sst.aws.Postgres("postgres", {
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
    command: "npx drizzle-kit studio",
  },
});
