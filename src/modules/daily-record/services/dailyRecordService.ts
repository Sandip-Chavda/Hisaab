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
        date,

        morning_cow_amount,
        morning_buffalo_amount,

        night_cow_amount,
        night_buffalo_amount,

        total_amount
      )

      VALUES (
        ?, ?,
        0, 0,
        0, 0,
        0
      );
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
  morning_cow_amount: number | null;

  morning_buffalo_amount: number | null;

  night_cow_amount: number | null;

  night_buffalo_amount: number | null;
}) {
  return (
    (record.morning_cow_amount ?? 0) +
    (record.morning_buffalo_amount ?? 0) +
    (record.night_cow_amount ?? 0) +
    (record.night_buffalo_amount ?? 0)
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
            COALESCE(morning_cow_amount, 0)
            +
            COALESCE(morning_buffalo_amount, 0)
            +
            COALESCE(night_cow_amount, 0)
            +
            COALESCE(night_buffalo_amount, 0)
          )

      WHERE id = ?;
    `,
    [recordId],
  );
}

export function ensureTodayRecordExists(milkBookId: number, date: string) {
  const existing = getDailyRecordByDate(milkBookId, date);

  if (existing) {
    return existing;
  }

  createEmptyDailyRecord(milkBookId, date);

  return getDailyRecordByDate(milkBookId, date);
}

export function getDailyRecordById(id: number) {
  return db.getFirstSync<DailyRecord>(
    `
      SELECT *
      FROM daily_records

      WHERE id = ?;
    `,
    [id],
  );
}

// --------------------------------- helper

export function seedLastMonthDummyData(milkBookId: number) {
  const now = new Date();

  // Last month
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const year = lastMonthDate.getFullYear();

  const month = lastMonthDate.getMonth();

  // Total days in last month
  const totalDays = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= totalDays; day++) {
    const formattedDate = `${year}-${String(month + 1).padStart(
      2,
      "0",
    )}-${String(day).padStart(2, "0")}`;

    // Create record
    createEmptyDailyRecord(milkBookId, formattedDate);

    const record = getDailyRecordByDate(milkBookId, formattedDate);

    if (!record) {
      continue;
    }

    // Random realistic quantities
    const quantities = [0, 0.5, 1, 1.5, 2];

    const randomQty = () =>
      quantities[Math.floor(Math.random() * quantities.length)];

    updateQuantityField(
      milkBookId,
      record.id,
      "morning_cow_qty",
      "cow",
      randomQty(),
    );

    updateQuantityField(
      milkBookId,
      record.id,
      "morning_buffalo_qty",
      "buffalo",
      randomQty(),
    );

    updateQuantityField(
      milkBookId,
      record.id,
      "night_cow_qty",
      "cow",
      randomQty(),
    );

    updateQuantityField(
      milkBookId,
      record.id,
      "night_buffalo_qty",
      "buffalo",
      randomQty(),
    );
  }

  console.log("Last month dummy data seeded");
}
