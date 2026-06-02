export function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export function formatDisplayDate(date: string) {
  const [year, month, day] = date.split("-");

  return `${day} / ${month} / ${year}`;
}
