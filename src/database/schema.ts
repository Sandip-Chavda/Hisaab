export const createTables = `
CREATE TABLE IF NOT EXISTS milk_books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  name TEXT NOT NULL,

  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS milk_rate_presets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  milk_book_id INTEGER NOT NULL,

  milk_type TEXT NOT NULL,

  quantity REAL NOT NULL,

  price REAL NOT NULL,

  created_at TEXT DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY(milk_book_id)
  REFERENCES milk_books(id)
);

CREATE TABLE IF NOT EXISTS daily_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  milk_book_id INTEGER NOT NULL,

  date TEXT NOT NULL,

  morning_cow_qty REAL DEFAULT NULL,
  morning_buffalo_qty REAL DEFAULT NULL,

  night_cow_qty REAL DEFAULT NULL,
  night_buffalo_qty REAL DEFAULT NULL,

  morning_cow_amount REAL DEFAULT 0,
  morning_buffalo_amount REAL DEFAULT 0,

  night_cow_amount REAL DEFAULT 0,
  night_buffalo_amount REAL DEFAULT 0,

  total_amount REAL DEFAULT 0,

  remarks TEXT,

  payment_status TEXT DEFAULT 'pending',

  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(milk_book_id, date),

  FOREIGN KEY(milk_book_id)
  REFERENCES milk_books(id)
);
`;
