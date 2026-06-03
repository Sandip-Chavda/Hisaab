import { db } from "@/database";

export function getMonthlySummary(milkBookId: number) {
  const now = new Date();

  const month = String(now.getMonth() + 1).padStart(2, "0");

  const year = String(now.getFullYear());

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

        WHERE milk_book_id = ?

        AND strftime(
          '%m',
          date
        ) = ?

        AND strftime(
          '%Y',
          date
        ) = ?;
      `,
    [milkBookId, month, year],
  );

  return {
    totalAmount: result?.totalAmount || 0,

    cowQuantity: result?.cowQuantity || 0,

    buffaloQuantity: result?.buffaloQuantity || 0,
  };
}
