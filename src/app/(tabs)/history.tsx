import { FlatList, View } from "react-native";

import { Screen } from "@/shared/ui/Screen";
import { Text } from "@/shared/ui/Text";

import { HistoryMonthCard } from "@/modules/history/components/HistoryMonthCard";

import { getHistoryMonths } from "@/modules/history/services/historyService";
import { getOrCreateCurrentMilkBook } from "@/modules/milk-book/services/currentMilkBookService";

export default function HistoryScreen() {
  const milkBook = getOrCreateCurrentMilkBook();

  const milkBookId = milkBook?.id || 1;

  const months = getHistoryMonths(milkBookId);

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
