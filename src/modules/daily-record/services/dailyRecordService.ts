import { db } from "@/database";

import { DailyRecord } from "../types";

export function getDailyRecords(milkBookId: number) {
  return db.getAllSync<DailyRecord>(
    `
      SELECT *
      FROM daily_records
      WHERE milk_book_id = ?
      ORDER BY date DESC;
    `,
    [milkBookId],
  );
}

export function createEmptyDailyRecord(milkBookId: number, date: string) {
  db.runSync(
    `
      INSERT OR IGNORE INTO daily_records (
  milk_book_id,
  date,

  morning_cow_price,
  morning_buffalo_price,

  night_cow_price,
  night_buffalo_price
)
VALUES (?, ?, 70, 80, 70, 80);
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
  morning_cow_qty: number;
  morning_buffalo_qty: number;

  night_cow_qty: number;
  night_buffalo_qty: number;

  morning_cow_price: number;
  morning_buffalo_price: number;

  night_cow_price: number;
  night_buffalo_price: number;
}) {
  return (
    record.morning_cow_qty * record.morning_cow_price +
    record.morning_buffalo_qty * record.morning_buffalo_price +
    record.night_cow_qty * record.night_cow_price +
    record.night_buffalo_qty * record.night_buffalo_price
  );
}

export function updateMorningCowQty(id: number, qty: number) {
  db.runSync(
    `
      UPDATE daily_records
      SET
        morning_cow_qty = ?,
        total_amount =
          (
            (? * morning_cow_price)
            +
            (morning_buffalo_qty * morning_buffalo_price)
            +
            (night_cow_qty * night_cow_price)
            +
            (night_buffalo_qty * night_buffalo_price)
          ),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?;
    `,
    [qty, qty, id],
  );
}
