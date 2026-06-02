import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import { DailyRecordCard } from "@/modules/daily-record/components/DailyRecordCard";

import {
  createEmptyDailyRecord,
  getDailyRecords,
} from "@/modules/daily-record/services/dailyRecordService";

import { DailyRecord } from "@/modules/daily-record/types";

import { getMilkBookById } from "@/modules/milk-book/services/milkBookService";

import { MilkBook } from "@/modules/milk-book/types";

import { Button } from "@/shared/ui/Button";
import { Screen } from "@/shared/ui/Screen";
import { Text } from "@/shared/ui/Text";

import { MonthlySummaryCard } from "@/modules/billing/components/MonthlySummaryCard";
import { getMonthlySummary } from "@/modules/billing/services/billingService";
import { MonthlySummary } from "@/modules/billing/types";
import { formatMonthLabel, getCurrentMonth, getTodayDate } from "@/utils/date";

export default function MilkBookDetailsScreen() {
  const { id } = useLocalSearchParams();

  const [milkBook, setMilkBook] = useState<MilkBook | null>(null);
  const [records, setRecords] = useState<DailyRecord[]>([]);
  const [summary, setSummary] = useState<MonthlySummary | null>(null);

  const currentMonth = getCurrentMonth();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth.month);

  const [selectedYear, setSelectedYear] = useState(currentMonth.year);

  const today = getTodayDate();

  useEffect(() => {
    if (!id) return;

    const data = getMilkBookById(Number(id));

    if (data) {
      setMilkBook(data);

      loadRecords(data.id);
    }
  }, [id, selectedMonth, selectedYear]);

  function loadRecords(milkBookId: number) {
    const data = getDailyRecords(milkBookId, selectedMonth, selectedYear);

    setRecords(data);

    const summaryData = getMonthlySummary(
      milkBookId,
      selectedMonth,
      selectedYear,
    );

    setSummary(summaryData);
  }

  function handleCreateTodayRecord() {
    if (!milkBook) return;

    const existingRecord = records.find((item) => item.date === today);

    if (existingRecord) {
      return;
    }

    createEmptyDailyRecord(milkBook.id, today);

    loadRecords(milkBook.id);
  }

  if (!milkBook) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: milkBook.name,
        }}
      />

      <Screen>
        <View className="mt-8">
          <Text className="text-3xl font-bold">{milkBook.name}</Text>

          <Text className="mt-2 text-gray-500">Daily milk records</Text>
        </View>

        <View className="mt-6 flex-row items-center justify-between">
          <Text className="text-xl font-bold">
            {formatMonthLabel(selectedMonth, selectedYear)}
          </Text>

          <View className="flex-row gap-2">
            <Button
              title="-"
              onPress={() => {
                if (selectedMonth === 1) {
                  setSelectedMonth(12);

                  setSelectedYear(selectedYear - 1);
                } else {
                  setSelectedMonth(selectedMonth - 1);
                }
              }}
            />

            <Button
              title="+"
              onPress={() => {
                if (selectedMonth === 12) {
                  setSelectedMonth(1);

                  setSelectedYear(selectedYear + 1);
                } else {
                  setSelectedMonth(selectedMonth + 1);
                }
              }}
            />
          </View>
        </View>

        <View className="mt-6">
          <Button title="Add Today Record" onPress={handleCreateTodayRecord} />
        </View>

        {summary && <MonthlySummaryCard summary={summary} />}

        <FlatList
          className="flex-1"
          data={records}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            paddingTop: 24,
            paddingBottom: 40,
            gap: 12,
          }}
          ListEmptyComponent={
            <View className="mt-20 items-center">
              <Text className="text-lg font-semibold">No records yet</Text>

              <Text className="mt-2 text-center text-gray-500">
                Create today's milk record to get started
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <DailyRecordCard
              record={item}
              onRefresh={() => loadRecords(milkBook.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </Screen>
    </>
  );
}
