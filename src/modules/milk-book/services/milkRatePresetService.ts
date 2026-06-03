import { db } from "@/database";

import { MilkRatePreset } from "../types/milkRatePreset";

export function getMilkRatePresets(
  milkBookId: number,
  milkType?: "cow" | "buffalo",
) {
  if (milkType) {
    return db.getAllSync<MilkRatePreset>(
      `
        SELECT *
        FROM milk_rate_presets

        WHERE milk_book_id = ?
        AND milk_type = ?

        ORDER BY quantity ASC;
      `,
      [milkBookId, milkType],
    );
  }

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
  const existing = getMilkRatePresets(milkBookId);

  // Prevent duplicate inserts
  if (existing.length > 0) {
    return;
  }

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

    {
      quantity: 2.5,
      cowPrice: 150,
      buffaloPrice: 170,
    },

    {
      quantity: 3,
      cowPrice: 180,
      buffaloPrice: 210,
    },
  ];

  presets.forEach((preset) => {
    // Cow
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

    // Buffalo
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

export function createMilkRatePreset(
  milkBookId: number,

  milkType: "cow" | "buffalo",

  quantity: number,

  price: number,
) {
  const existing = db.getFirstSync<{
    id: number;
  }>(
    `
        SELECT id

        FROM milk_rate_presets

        WHERE milk_book_id = ?
        AND milk_type = ?
        AND quantity = ?;
      `,
    [milkBookId, milkType, quantity],
  );

  // Update existing preset
  if (existing) {
    db.runSync(
      `
        UPDATE milk_rate_presets

        SET price = ?

        WHERE id = ?;
      `,
      [price, existing.id],
    );

    return "updated";
  }

  // Create new preset
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
    [milkBookId, milkType, quantity, price],
  );

  return "created";
}

export function deleteMilkRatePreset(id: number) {
  db.runSync(
    `
      DELETE FROM milk_rate_presets

      WHERE id = ?;
    `,
    [id],
  );
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
