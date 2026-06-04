export function formatIndianCurrency(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}
