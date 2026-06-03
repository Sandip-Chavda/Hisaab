import { db } from "@/database";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getOrCreateCurrentMilkBook() {
  const now = new Date();

  const month = now.getMonth();

  const year = now.getFullYear();

  const name = `${MONTH_NAMES[month]} ${year}`;

  const existing = db.getFirstSync<{
    id: number;
    name: string;
  }>(
    `
        SELECT *
        FROM milk_books

        WHERE name = ?;
      `,
    [name],
  );

  if (existing) {
    return existing;
  }

  db.runSync(
    `
      INSERT INTO milk_books (
        name
      )

      VALUES (?);
    `,
    [name],
  );

  return db.getFirstSync<{
    id: number;
    name: string;
  }>(
    `
      SELECT *
      FROM milk_books

      WHERE name = ?;
    `,
    [name],
  );
}
