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

import { getTodayDate } from "@/utils/date";

export default function MilkBookDetailsScreen() {
  const { id } = useLocalSearchParams();

  const [milkBook, setMilkBook] = useState<MilkBook | null>(null);

  const [records, setRecords] = useState<DailyRecord[]>([]);

  const today = getTodayDate();

  useEffect(() => {
    if (!id) return;

    const data = getMilkBookById(Number(id));

    if (data) {
      setMilkBook(data);

      const recordsData = getDailyRecords(data.id);

      setRecords(recordsData);
    }
  }, [id]);

  function loadRecords() {
    if (!milkBook) return;

    const data = getDailyRecords(milkBook.id);

    setRecords(data);
  }

  function handleCreateTodayRecord() {
    if (!milkBook) return;

    createEmptyDailyRecord(milkBook.id, today);

    loadRecords();
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

        <View className="mt-6">
          <Button
            title="Create Today Record"
            onPress={handleCreateTodayRecord}
          />
        </View>

        <FlatList
          className="flex-1"
          data={records}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            paddingTop: 24,
            paddingBottom: 40,
            gap: 12,
          }}
          renderItem={({ item }) => <DailyRecordCard record={item} />}
          showsVerticalScrollIndicator={false}
        />
      </Screen>
    </>
  );
}
