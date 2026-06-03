import { ScrollView, View } from "react-native";

import { useCallback, useState } from "react";

import { useFocusEffect } from "expo-router";

import { Screen } from "@/shared/ui/Screen";
import { Text } from "@/shared/ui/Text";

import { DailyRecordCard } from "@/modules/daily-record/components/DailyRecordCard";

import { ensureTodayRecordExists } from "@/modules/daily-record/services/dailyRecordService";

import { DailyRecord } from "@/modules/daily-record/types";

import { HomeSummaryCard } from "@/modules/home/components/HomeSummaryCard";

import { getMonthlySummary } from "@/modules/home/services/homeSummaryService";

import { getOrCreateCurrentMilkBook } from "@/modules/milk-book/services/currentMilkBookService";

import { getTodayDate } from "@/utils/date";

export default function HomeScreen() {
  const [record, setRecord] = useState<DailyRecord | null>(null);

  const [milkBookId, setMilkBookId] = useState<number>(1);

  const [summary, setSummary] = useState({
    totalAmount: 0,
    cowQuantity: 0,
    buffaloQuantity: 0,
  });

  const loadHomeData = useCallback(() => {
    const milkBook = getOrCreateCurrentMilkBook();

    if (!milkBook) {
      return;
    }

    setMilkBookId(milkBook.id);

    const todayRecord = ensureTodayRecordExists(milkBook.id, getTodayDate());

    if (todayRecord) {
      setRecord(todayRecord);
    }

    setSummary(getMonthlySummary(milkBook.id));
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
          <View className="mb-16 mt-6">
            <DailyRecordCard
              key={summary.totalAmount}
              milkBookId={milkBookId}
              record={record}
              onRefresh={() => {
                loadHomeData();
              }}
            />
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
