import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";

import { View } from "react-native";

import { DailyRecordCard } from "@/modules/daily-record/components/DailyRecordCard";

import { getDailyRecordById } from "@/modules/daily-record/services/dailyRecordService";

import { Screen } from "@/shared/ui/Screen";

import { Text } from "@/shared/ui/Text";
import { useCallback, useState } from "react";

export default function EditRecordScreen() {
  const { id } = useLocalSearchParams();

  const [record, setRecord] = useState(getDailyRecordById(Number(id)));

  const loadRecord = useCallback(() => {
    const updated = getDailyRecordById(Number(id));

    setRecord(updated);
  }, [id]);

  const milkBookId = 1;

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
          <Text className="text-3xl font-bold">Edit Entry</Text>

          <Text className="mt-2 text-gray-500">Update milk quantities</Text>
        </View>

        <View className="mt-6">
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
