import { db } from "@/database";

import { MilkBook } from "../types";
import { createDefaultMilkPresets } from "./milkRatePresetService";

export function getMilkBooks(): MilkBook[] {
  return db.getAllSync<MilkBook>(
    "SELECT * FROM milk_books ORDER BY created_at DESC",
  );
}

export function createMilkBook(name: string) {
  db.runSync(
    `
      INSERT INTO milk_books (
        name
      )

      VALUES (?);
    `,
    [name],
  );

  const result = db.getFirstSync<{
    id: number;
  }>(
    `
        SELECT last_insert_rowid() as id;
      `,
  );

  if (result?.id) {
    createDefaultMilkPresets(result.id);
  }
}

export function getMilkBookById(id: number) {
  return db.getFirstSync<MilkBook>(
    `
      SELECT * FROM milk_books
      WHERE id = ?;
    `,
    [id],
  );
}
