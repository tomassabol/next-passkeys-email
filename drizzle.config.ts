import { type Config } from "drizzle-kit";

// import { env } from "~/env.mjs";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "better-sqlite",
  out: "./drizzle",
  dbCredentials: {
    url: "sqlite.db",
  },
} satisfies Config;
