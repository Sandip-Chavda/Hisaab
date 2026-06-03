import { FlatList, View } from "react-native";

import { useCallback, useState } from "react";

import { useFocusEffect } from "expo-router";

import { Screen } from "@/shared/ui/Screen";
import { Text } from "@/shared/ui/Text";

import { HistoryMonthCard } from "@/modules/history/components/HistoryMonthCard";

import { getHistoryMonths } from "@/modules/history/services/historyService";

import { getOrCreateCurrentMilkBook } from "@/modules/milk-book/services/currentMilkBookService";

import { useTranslation } from "react-i18next";

type HistoryMonth = {
  month: string;

  year: string;

  totalAmount: number;
};

export default function HistoryScreen() {
  const [months, setMonths] = useState<HistoryMonth[]>([]);

  const { t, i18n } = useTranslation();

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
        <Text
          className="font-bold text-black"
          style={{
            fontSize: 44,
            lineHeight: 58,
          }}
        >
          {t("history")}
        </Text>

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
