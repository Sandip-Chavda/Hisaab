import { db } from "@/database";

import { MonthlySummary } from "../types";

export function getMonthlySummary(
  milkBookId: number,
  month: number,
  year: number,
): MonthlySummary {
  const formattedMonth = String(month).padStart(2, "0");

  const result = db.getFirstSync<MonthlySummary>(
    `
        SELECT

          SUM(morning_cow_qty)
            as totalMorningCow,

          SUM(morning_buffalo_qty)
            as totalMorningBuffalo,

          SUM(night_cow_qty)
            as totalNightCow,

          SUM(night_buffalo_qty)
            as totalNightBuffalo,

          SUM(
            morning_cow_qty +
            morning_buffalo_qty +
            night_cow_qty +
            night_buffalo_qty
          ) as totalQuantity,

          SUM(total_amount)
            as totalAmount

        FROM daily_records

        WHERE milk_book_id = ?
        AND strftime('%m', date) = ?
        AND strftime('%Y', date) = ?;
      `,
    [milkBookId, formattedMonth, String(year)],
  );

  return {
    totalMorningCow: result?.totalMorningCow || 0,

    totalMorningBuffalo: result?.totalMorningBuffalo || 0,

    totalNightCow: result?.totalNightCow || 0,

    totalNightBuffalo: result?.totalNightBuffalo || 0,

    totalQuantity: result?.totalQuantity || 0,

    totalAmount: result?.totalAmount || 0,
  };
}
