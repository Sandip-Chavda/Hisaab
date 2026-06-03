import { FlatList, View } from "react-native";

import { Screen } from "@/shared/ui/Screen";
import { Text } from "@/shared/ui/Text";

import { getDailyRecords } from "@/modules/daily-record/services/dailyRecordService";
import { DailyRecord } from "@/modules/daily-record/types";
import { HistoryRecordCard } from "@/modules/history/components/HistoryRecordCard";
import { getCurrentMonth } from "@/utils/date";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export default function HistoryScreen() {
  const milkBookId = 1;

  const { month, year } = getCurrentMonth();

  const [records, setRecords] = useState<DailyRecord[]>([]);

  const loadRecords = useCallback(() => {
    const data = getDailyRecords(milkBookId, month, year);

    setRecords(data);
  }, [milkBookId, month, year]);

  useFocusEffect(
    useCallback(() => {
      loadRecords();
    }, [loadRecords]),
  );

  return (
    <Screen>
      <View className="mt-2">
        <Text className="text-4xl font-bold">History</Text>

        <Text className="mt-2 text-gray-500">Previous daily entries</Text>
      </View>

      <FlatList
        data={records}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingTop: 24,
          paddingBottom: 40,
        }}
        renderItem={({ item }) => (
          <View className="mb-4">
            <HistoryRecordCard record={item} />
          </View>
        )}
      />
    </Screen>
  );
}
