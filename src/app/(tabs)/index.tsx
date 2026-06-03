import { Pressable, ScrollView, View } from "react-native";

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
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
  const { t, i18n } = useTranslation();

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
        <View className="mt-2 flex-row items-center justify-between">
          <Text
            className="font-bold text-black"
            style={{
              fontSize: 44,
              lineHeight: 58,
            }}
          >
            {t("appName")}
          </Text>

          <View className="flex-row overflow-hidden rounded-2xl border border-gray-200">
            {/* English */}
            <Pressable
              onPress={() => {
                i18n.changeLanguage("en");
              }}
              className={`px-4 py-2 ${
                i18n.language === "en" ? "bg-red-500" : "bg-white"
              }`}
            >
              <Text
                className={`font-semibold ${
                  i18n.language === "en" ? "text-white" : "text-gray-700"
                }`}
              >
                EN
              </Text>
            </Pressable>

            {/* Gujarati */}
            <Pressable
              onPress={() => {
                i18n.changeLanguage("gu");
              }}
              className={`px-4 py-2 ${
                i18n.language === "gu" ? "bg-red-500" : "bg-white"
              }`}
            >
              <Text
                className={`font-semibold ${
                  i18n.language === "gu" ? "text-white" : "text-gray-700"
                }`}
              >
                ગુજ
              </Text>
            </Pressable>
          </View>
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
