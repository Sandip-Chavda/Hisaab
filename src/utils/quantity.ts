export const QUANTITY_OPTIONS = [
  {
    value: 0,
    label: "રજા",
  },

  {
    value: 0.5,
    label: "0.5L — અડધો શેર / લિટર",
  },

  {
    value: 0.75,
    label: "0.75L — પોણો શેર",
  },

  {
    value: 1,
    label: "1L — એક શેર / લિટર",
  },

  {
    value: 1.5,
    label: "1.5L — દોઢ શેર",
  },

  {
    value: 2,
    label: "2L — બે શેર / લિટર",
  },

  {
    value: 2.5,
    label: "2.5L — અઢી શેર / લિટર",
  },

  {
    value: 3,
    label: "3L — ત્રણ શેર / લિટર",
  },
];

export function getQuantityLabel(
  value: number,

  language: string,
) {
  if (language === "gu") {
    const guMap: Record<number, string> = {
      0: "રજા",

      0.5: "0.5L — અડધો શેર / લિટર",

      0.75: "0.75L — પોણો શેર",

      1: "1L — એક શેર / લિટર",

      1.5: "1.5L — દોઢ શેર",

      2: "2L — બે શેર / લિટર",

      2.5: "2.5L — અઢી શેર / લિટર",

      3: "3L — ત્રણ શેર / લિટર",
    };

    return guMap[value] || `${value}L`;
  }

  const enMap: Record<number, string> = {
    0: "Holiday",

    0.5: "0.5L — Half Liter",

    0.75: "0.75L — Three Quarter",

    1: "1L — One Liter",

    1.5: "1.5L — One and Half",

    2: "2L — Two Liter",

    2.5: "2.5L — Two and Half",

    3: "3L — Three Liter",
  };

  return enMap[value] || `${value}L`;
}
