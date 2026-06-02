export function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export function formatDisplayDate(date: string) {
  const [year, month, day] = date.split("-");

  return `${day} / ${month} / ${year}`;
}

export function getCurrentMonth() {
  const now = new Date();

  return {
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  };
}

export function formatMonthLabel(month: number, year: number) {
  const date = new Date(year, month - 1);

  return date.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
}
