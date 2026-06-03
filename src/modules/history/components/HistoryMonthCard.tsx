import { Pressable, View } from "react-native";

import { router } from "expo-router";

import { Text } from "@/shared/ui/Text";

type Props = {
  month: number;

  year: number;

  totalAmount: number;
};

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function HistoryMonthCard({ month, year, totalAmount }: Props) {
  const now = new Date();

  const currentMonth = now.getMonth() + 1;

  const currentYear = now.getFullYear();

  const isCurrentMonth =
    Number(month) === currentMonth && Number(year) === currentYear;

  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/history-month",

          params: {
            month,
            year,
          },
        });
      }}
      className={`rounded-3xl border p-5 ${
        isCurrentMonth ? "border-red-200 bg-red-50" : "border-gray-200 bg-white"
      }`}
    >
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-bold">
            {MONTH_NAMES[month - 1]} {year}
          </Text>

          {isCurrentMonth && (
            <View className="mt-2 self-start rounded-full bg-red-100 px-2 py-1">
              <Text className="text-[10px] font-medium text-red-600">
                Current Month
              </Text>
            </View>
          )}

          <Text className="mt-2 text-gray-500">Monthly archive</Text>
        </View>

        <View className="items-end">
          <Text className="text-xs text-gray-500">Total</Text>

          <Text className="mt-1 text-xl font-bold text-red-600">
            ₹ {totalAmount.toFixed(0)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
