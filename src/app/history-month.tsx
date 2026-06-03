import { useLocalSearchParams } from "expo-router";

import { FlatList, View } from "react-native";

import { Screen } from "@/shared/ui/Screen";
import { Text } from "@/shared/ui/Text";

import { HistoryRecordCard } from "@/modules/history/components/HistoryRecordCard";

import { getDailyRecords } from "@/modules/daily-record/services/dailyRecordService";

import { getOrCreateCurrentMilkBook } from "@/modules/milk-book/services/currentMilkBookService";

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

export default function HistoryMonthScreen() {
  const { month, year } = useLocalSearchParams();

  const milkBook = getOrCreateCurrentMilkBook();

  const records = getDailyRecords(
    milkBook?.id ?? 1,
    Number(month),
    Number(year),
  );

  return (
    <Screen>
      <View className="mt-2">
        <Text className="text-3xl font-bold">
          {MONTH_NAMES[Number(month) - 1]} {year}
        </Text>

        <Text className="mt-2 text-gray-500">Monthly records</Text>
      </View>

      <FlatList
        data={records}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingTop: 24,
          paddingBottom: 40,
        }}
        renderItem={({ item }) => (
          <View className="mb-2">
            <HistoryRecordCard record={item} />
          </View>
        )}
      />
    </Screen>
  );
}
