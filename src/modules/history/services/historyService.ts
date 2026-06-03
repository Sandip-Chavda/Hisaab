import { db } from "@/database";

export function getHistoryMonths(milkBookId: number) {
  return db.getAllSync<{
    month: string;
    year: string;
    totalAmount: number;
  }>(
    `
      SELECT
        strftime('%m', date) as month,

        strftime('%Y', date) as year,

        COALESCE(
          SUM(total_amount),
          0
        ) as totalAmount

      FROM daily_records

      WHERE milk_book_id = ?

      GROUP BY
        strftime('%m', date),
        strftime('%Y', date)

      ORDER BY date DESC;
    `,
    [milkBookId],
  );
}
