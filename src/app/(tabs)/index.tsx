import { ScrollView, View } from "react-native";

import { Screen } from "@/shared/ui/Screen";
import { Text } from "@/shared/ui/Text";

import { DailyRecordCard } from "@/modules/daily-record/components/DailyRecordCard";
import { ensureTodayRecordExists } from "@/modules/daily-record/services/dailyRecordService";
import { DailyRecord } from "@/modules/daily-record/types";
import { HomeSummaryCard } from "@/modules/home/components/HomeSummaryCard";
import { getMonthlySummary } from "@/modules/home/services/homeSummaryService";
import { getTodayDate } from "@/utils/date";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export default function HomeScreen() {
  const [record, setRecord] = useState<DailyRecord | null>(null);
  const [summary, setSummary] = useState({
    totalAmount: 0,
    cowQuantity: 0,
    buffaloQuantity: 0,
  });

  // Temporary fixed month id
  const milkBookId = 1;

  const loadHomeData = useCallback(() => {
    const todayRecord = ensureTodayRecordExists(milkBookId, getTodayDate());

    if (todayRecord) {
      setRecord(todayRecord);
    }

    setSummary(getMonthlySummary(milkBookId));
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadHomeData();
    }, [loadHomeData]),
  );

  return (
    <Screen>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mt-2">
          <Text className="text-4xl font-bold">Hisaab</Text>
        </View>

        {/* Summary */}
        <View className="mt-4">
          <HomeSummaryCard
            totalAmount={summary.totalAmount}
            cowQuantity={summary.cowQuantity}
            buffaloQuantity={summary.buffaloQuantity}
          />
        </View>

        {/* Today Record */}
        {record && (
          <View className="mt-6 mb-16">
            <DailyRecordCard
              milkBookId={milkBookId}
              record={record}
              onRefresh={() => {
                const updated = ensureTodayRecordExists(
                  milkBookId,
                  getTodayDate(),
                );

                if (updated) {
                  setRecord(updated);
                  setSummary(getMonthlySummary(milkBookId));
                }
              }}
            />
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
