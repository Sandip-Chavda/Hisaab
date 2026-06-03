import { db } from "@/database";

export function getMonthlySummary(milkBookId: number) {
  const result = db.getFirstSync<{
    totalAmount: number;

    cowQuantity: number;

    buffaloQuantity: number;
  }>(
    `
        SELECT
          COALESCE(
            SUM(total_amount),
            0
          ) as totalAmount,

          COALESCE(
            SUM(
              COALESCE(
                morning_cow_qty,
                0
              )
              +
              COALESCE(
                night_cow_qty,
                0
              )
            ),
            0
          ) as cowQuantity,

          COALESCE(
            SUM(
              COALESCE(
                morning_buffalo_qty,
                0
              )
              +
              COALESCE(
                night_buffalo_qty,
                0
              )
            ),
            0
          ) as buffaloQuantity

        FROM daily_records

        WHERE milk_book_id = ?;
      `,
    [milkBookId],
  );

  return {
    totalAmount: result?.totalAmount || 0,

    cowQuantity: result?.cowQuantity || 0,

    buffaloQuantity: result?.buffaloQuantity || 0,
  };
}
