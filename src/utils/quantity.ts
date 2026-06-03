export const QUANTITY_OPTIONS = [
  {
    value: 0,
    label: "રાજા",
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

export function getQuantityLabel(quantity: number | null) {
  if (quantity === null || quantity === undefined) {
    return "Select quantity";
  }

  const option = QUANTITY_OPTIONS.find((item) => item.value === quantity);

  return option?.label ?? `${quantity}L`;
}
