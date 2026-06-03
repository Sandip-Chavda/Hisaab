import { openDatabaseSync } from "expo-sqlite";

import { createTables } from "./schema";

export const db = openDatabaseSync("hishaab.db");

export function initDatabase() {
  db.execSync(createTables);

  console.log("Database initialized");
}
