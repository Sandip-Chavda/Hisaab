import { create } from "zustand";

import { createMilkBook, getMilkBooks } from "../services/milkBookService";

import { MilkBook } from "../types";

type MilkBookStore = {
  milkBooks: MilkBook[];

  loadMilkBooks: () => void;

  addMilkBook: (name: string) => void;
};

export const useMilkBookStore = create<MilkBookStore>((set) => ({
  milkBooks: [],

  loadMilkBooks: () => {
    const data = getMilkBooks();

    set({
      milkBooks: data,
    });
  },

  addMilkBook: (name) => {
    createMilkBook(name);

    const updated = getMilkBooks();

    set({
      milkBooks: updated,
    });
  },
}));
