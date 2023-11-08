// import { drizzle } from "drizzle-orm/libsql";
// import { createClient } from "@libsql/client";

// import { env } from "~/env.mjs";
// import * as schema from "./schema";

// // const client =
// export const db = drizzle(
//   createClient({
//     url: env.DATABASE_URL,
//     authToken: env.DATABASE_AUTH_TOKEN,
//   }),
//   { schema },
// );

import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

// eslint-disable-next-line
const sqlite = new Database("sqlite.db");
export const db = drizzle(sqlite, { schema });
