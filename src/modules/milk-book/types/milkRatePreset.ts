export type MilkRatePreset = {
  id: number;

  milk_book_id: number;

  milk_type: "cow" | "buffalo";

  quantity: number;

  price: number;

  created_at: string;
};
