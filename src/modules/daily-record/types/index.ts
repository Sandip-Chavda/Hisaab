export type DailyRecord = {
  id: number;

  milk_book_id: number;

  date: string;

  morning_cow_qty: number | null;
  morning_buffalo_qty: number | null;

  night_cow_qty: number | null;
  night_buffalo_qty: number | null;

  morning_cow_amount: number;
  morning_buffalo_amount: number;

  night_cow_amount: number;
  night_buffalo_amount: number;

  total_amount: number;

  remarks: string | null;

  payment_status: string;

  created_at: string;
  updated_at: string;
};
