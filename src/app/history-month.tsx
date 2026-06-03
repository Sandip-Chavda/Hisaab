import { useFocusEffect, useLocalSearchParams } from "expo-router";

import { FlatList, View } from "react-native";

import { Screen } from "@/shared/ui/Screen";
import { Text } from "@/shared/ui/Text";

import { HistoryRecordCard } from "@/modules/history/components/HistoryRecordCard";

import { getDailyRecords } from "@/modules/daily-record/services/dailyRecordService";
import { DailyRecord } from "@/modules/daily-record/types";
import { getOrCreateCurrentMilkBook } from "@/modules/milk-book/services/currentMilkBookService";
import { useCallback, useState } from "react";

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

  const [records, setRecords] = useState<DailyRecord[]>([]);

  const loadRecords = useCallback(() => {
    const milkBook = getOrCreateCurrentMilkBook();

    if (!milkBook) {
      return;
    }

    const data = getDailyRecords(milkBook.id, Number(month), Number(year));

    setRecords(data);
  }, [month, year]);

  useFocusEffect(
    useCallback(() => {
      loadRecords();
    }, [loadRecords]),
  );

  return (
    <Screen>
      <View className="mt-2">
        <Text className="text-3xl font-bold">
          {MONTH_NAMES[Number(month) - 1]} {year}
        </Text>

        <Text className="mt-2 text-gray-500">Monthly records</Text>
      </View>

      <View className="mt-5 rounded-3xl bg-red-50 p-5">
        <Text className="text-sm text-red-500">Monthly Total</Text>

        <Text className="mt-2 text-3xl font-bold text-red-600">
          ₹{" "}
          {records.reduce((sum, item) => sum + item.total_amount, 0).toFixed(0)}
        </Text>

        <Text className="mt-2 text-sm text-gray-500">
          {records.length} records
        </Text>
      </View>

      <FlatList
        data={records}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingTop: 24,
          paddingBottom: 120,
        }}
        ListEmptyComponent={
          <View className="mt-20 items-center">
            <Text className="text-lg font-semibold text-gray-400">
              No records found
            </Text>

            <Text className="mt-2 text-sm text-gray-400">
              No milk entries for this month
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="mb-2">
            <HistoryRecordCard record={item} />
          </View>
        )}
      />
    </Screen>
  );
}
