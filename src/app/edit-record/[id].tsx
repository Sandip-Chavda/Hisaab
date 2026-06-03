import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";

import { View } from "react-native";

import { DailyRecordCard } from "@/modules/daily-record/components/DailyRecordCard";

import { getDailyRecordById } from "@/modules/daily-record/services/dailyRecordService";

import { Screen } from "@/shared/ui/Screen";

import { getOrCreateCurrentMilkBook } from "@/modules/milk-book/services/currentMilkBookService";
import { Text } from "@/shared/ui/Text";

import { formatDisplayDate } from "@/utils/date";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export default function EditRecordScreen() {
  const { id } = useLocalSearchParams();

  const { t, i18n } = useTranslation();

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
              {t("edit")} - {formatDisplayDate(record.date)}
            </Text>
          </Text>

          <Text className="mt-2 text-gray-500">{t("correctOrUpdate")}</Text>

          <View className="mt-5 rounded-2xl bg-green-100 p-4">
            <Text className="text-sm text-green-600 text-center">
              {t("changesSaved")}
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
