import { db } from "@/database";

import { MilkBook } from "../types";

export function getMilkBooks(): MilkBook[] {
  return db.getAllSync<MilkBook>(
    "SELECT * FROM milk_books ORDER BY created_at DESC",
  );
}

export function createMilkBook(name: string) {
  db.runSync(
    `
      INSERT INTO milk_books (name)
      VALUES (?);
    `,
    [name],
  );
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
