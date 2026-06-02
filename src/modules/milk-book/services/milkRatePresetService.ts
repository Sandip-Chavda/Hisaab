import { db } from "@/database";

import { MilkRatePreset } from "../types/milkRatePreset";

export function getMilkRatePresets(milkBookId: number) {
  return db.getAllSync<MilkRatePreset>(
    `
      SELECT *
      FROM milk_rate_presets

      WHERE milk_book_id = ?

      ORDER BY quantity ASC;
    `,
    [milkBookId],
  );
}

export function createDefaultMilkPresets(milkBookId: number) {
  const presets = [
    {
      quantity: 0,
      cowPrice: 0,
      buffaloPrice: 0,
    },
    {
      quantity: 0.5,
      cowPrice: 35,
      buffaloPrice: 40,
    },

    {
      quantity: 0.75,
      cowPrice: 50,
      buffaloPrice: 55,
    },

    {
      quantity: 1,
      cowPrice: 60,
      buffaloPrice: 70,
    },

    {
      quantity: 1.5,
      cowPrice: 95,
      buffaloPrice: 105,
    },

    {
      quantity: 2,
      cowPrice: 120,
      buffaloPrice: 140,
    },
  ];

  presets.forEach((preset) => {
    db.runSync(
      `
        INSERT INTO milk_rate_presets (
          milk_book_id,
          milk_type,
          quantity,
          price
        )

        VALUES (?, ?, ?, ?);
      `,
      [milkBookId, "cow", preset.quantity, preset.cowPrice],
    );

    db.runSync(
      `
        INSERT INTO milk_rate_presets (
          milk_book_id,
          milk_type,
          quantity,
          price
        )

        VALUES (?, ?, ?, ?);
      `,
      [milkBookId, "buffalo", preset.quantity, preset.buffaloPrice],
    );
  });
}

export function getPresetPrice(
  milkBookId: number,
  milkType: "cow" | "buffalo",
  quantity: number,
) {
  return db.getFirstSync<{
    price: number;
  }>(
    `
      SELECT price

      FROM milk_rate_presets

      WHERE milk_book_id = ?
      AND milk_type = ?
      AND quantity = ?;
    `,
    [milkBookId, milkType, quantity],
  );
}
