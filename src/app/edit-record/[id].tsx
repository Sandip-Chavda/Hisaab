import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";

import { View } from "react-native";

import { DailyRecordCard } from "@/modules/daily-record/components/DailyRecordCard";

import { getDailyRecordById } from "@/modules/daily-record/services/dailyRecordService";

import { Screen } from "@/shared/ui/Screen";

import { getOrCreateCurrentMilkBook } from "@/modules/milk-book/services/currentMilkBookService";
import { Text } from "@/shared/ui/Text";
import { formatDisplayDate } from "@/utils/date";
import { useCallback, useState } from "react";

export default function EditRecordScreen() {
  const { id } = useLocalSearchParams();

  const [record, setRecord] = useState(getDailyRecordById(Number(id)));

  const loadRecord = useCallback(() => {
    const updated = getDailyRecordById(Number(id));

    setRecord(updated);
  }, [id]);

  const milkBook = getOrCreateCurrentMilkBook();

  const milkBookId = milkBook?.id || 1;

  useFocusEffect(
    useCallback(() => {
      loadRecord();
    }, [loadRecord]),
  );

  if (!record) {
    return (
      <Screen>
        <Text>Record not found</Text>
      </Screen>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Edit Record",
        }}
      />

      <Screen>
        <View className="mt-2">
          <Text className="text-3xl font-bold">
            <Text className="text-3xl font-bold">
              Edit -- {formatDisplayDate(record.date)}
            </Text>
          </Text>

          <Text className="mt-2 text-gray-500">
            Correct or update milk entries
          </Text>

          <View className="mt-5 rounded-2xl bg-gray-100 p-4">
            <Text className="text-sm text-gray-600">
              Changes are saved automatically
            </Text>
          </View>
        </View>

        <View className="mt-5">
          <DailyRecordCard
            milkBookId={milkBookId}
            record={record}
            onRefresh={() => {
              loadRecord();
            }}
          />
        </View>
      </Screen>
    </>
  );
}
