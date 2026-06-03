import { FlatList, View } from "react-native";

import { useCallback, useState } from "react";

import { useFocusEffect } from "expo-router";

import { Screen } from "@/shared/ui/Screen";
import { Text } from "@/shared/ui/Text";

import { HistoryMonthCard } from "@/modules/history/components/HistoryMonthCard";

import { getHistoryMonths } from "@/modules/history/services/historyService";

import { getOrCreateCurrentMilkBook } from "@/modules/milk-book/services/currentMilkBookService";

type HistoryMonth = {
  month: string;

  year: string;

  totalAmount: number;
};

export default function HistoryScreen() {
  const [months, setMonths] = useState<HistoryMonth[]>([]);

  const loadMonths = useCallback(() => {
    const milkBook = getOrCreateCurrentMilkBook();

    if (!milkBook) {
      return;
    }

    const data = getHistoryMonths(milkBook.id);

    setMonths(data);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadMonths();
    }, [loadMonths]),
  );

  return (
    <Screen>
      <View className="mt-2">
        <Text className="text-3xl font-bold">History</Text>

        <Text className="mt-2 text-gray-500">Monthly milk records</Text>
      </View>

      <FlatList
        data={months}
        keyExtractor={(item) => `${item.month}-${item.year}`}
        contentContainerStyle={{
          paddingTop: 24,
          paddingBottom: 40,
        }}
        renderItem={({ item }) => (
          <View className="mb-3">
            <HistoryMonthCard
              month={Number(item.month)}
              year={Number(item.year)}
              totalAmount={item.totalAmount}
            />
          </View>
        )}
      />
    </Screen>
  );
}
