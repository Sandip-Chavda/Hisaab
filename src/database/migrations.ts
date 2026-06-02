import { db } from "./index";
import { createTables } from "./schema";

export async function runMigrations() {
  try {
    db.execSync(createTables);

    console.log("Database initialized");
  } catch (error) {
    console.log("Migration error:", error);
  }
}
