export type DailyRecord = {
  id: number;

  milk_book_id: number;

  date: string;

  morning_cow_qty: number;
  morning_buffalo_qty: number;

  night_cow_qty: number;
  night_buffalo_qty: number;

  morning_cow_price: number;
  morning_buffalo_price: number;

  night_cow_price: number;
  night_buffalo_price: number;

  total_amount: number;

  remarks: string | null;

  payment_status: string;

  created_at: string;
  updated_at: string;
};
