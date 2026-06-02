import { db } from "@/database";

import { getPresetPrice } from "@/modules/milk-book/services/milkRatePresetService";
import { DailyRecord } from "../types";

export function getDailyRecords(
  milkBookId: number,
  month: number,
  year: number,
) {
  const formattedMonth = String(month).padStart(2, "0");

  return db.getAllSync<DailyRecord>(
    `
      SELECT *
      FROM daily_records

      WHERE milk_book_id = ?
      AND strftime('%m', date) = ?
      AND strftime('%Y', date) = ?

      ORDER BY date DESC;
    `,
    [milkBookId, formattedMonth, String(year)],
  );
}

export function createEmptyDailyRecord(milkBookId: number, date: string) {
  db.runSync(
    `
      INSERT OR IGNORE INTO daily_records (
        milk_book_id,
        date
      )

      VALUES (?, ?);
    `,
    [milkBookId, date],
  );
}

export function updateDailyRecordField(
  id: number,
  field: string,
  value: number,
) {
  db.runSync(
    `
      UPDATE daily_records
      SET ${field} = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?;
    `,
    [value, id],
  );
}

export function getDailyRecordByDate(milkBookId: number, date: string) {
  return db.getFirstSync<DailyRecord>(
    `
      SELECT *
      FROM daily_records
      WHERE milk_book_id = ?
      AND date = ?;
    `,
    [milkBookId, date],
  );
}

export function calculateTotalAmount(record: {
  morning_cow_amount: number;

  morning_buffalo_amount: number;

  night_cow_amount: number;

  night_buffalo_amount: number;
}) {
  return (
    record.morning_cow_amount +
    record.morning_buffalo_amount +
    record.night_cow_amount +
    record.night_buffalo_amount
  );
}

export function updateQuantityField(
  milkBookId: number,
  recordId: number,
  field: string,
  milkType: "cow" | "buffalo",
  quantity: number,
) {
  const preset = getPresetPrice(milkBookId, milkType, quantity);

  const amount = preset?.price || 0;

  const amountField = field.replace("_qty", "_amount");

  db.runSync(
    `
      UPDATE daily_records

      SET
        ${field} = ?,
        ${amountField} = ?,
        updated_at = CURRENT_TIMESTAMP

      WHERE id = ?;
    `,
    [quantity, amount, recordId],
  );

  recalculateTotal(recordId);
}

export function recalculateTotal(recordId: number) {
  db.runSync(
    `
      UPDATE daily_records

      SET
        total_amount =
          (
            morning_cow_amount
            +
            morning_buffalo_amount
            +
            night_cow_amount
            +
            night_buffalo_amount
          )

      WHERE id = ?;
    `,
    [recordId],
  );
}
