import { Pressable, View } from "react-native";

import { useRouter } from "expo-router";

import { useTranslation } from "react-i18next";

import { DailyRecord } from "@/modules/daily-record/types";

import { Text } from "@/shared/ui/Text";

import { formatDisplayDate, getTodayDate } from "@/utils/date";

import { getQuantityLabel } from "@/utils/quantity";

type Props = {
  record: DailyRecord;
};

export function HistoryRecordCard({ record }: Props) {
  const router = useRouter();

  const { t, i18n } = useTranslation();

  const isToday = record.date === getTodayDate();

  function formatQuantity(value: number | null) {
    if (value === null) {
      return "--";
    }

    return getQuantityLabel(value, i18n.language);
  }

  return (
    <View
      className={`rounded-3xl border p-4 ${
        isToday ? "border-red-200 bg-red-50" : "border-gray-200 bg-white"
      }`}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Text className="text-base font-bold">
            {formatDisplayDate(record.date)}
          </Text>

          {isToday && (
            <View className="rounded-full bg-red-100 px-2 py-1">
              <Text className="text-[10px] font-medium text-red-600">
                {t("today")}
              </Text>
            </View>
          )}
        </View>

        <Pressable
          onPress={() => {
            router.push(`/edit-record/${record.id}`);
          }}
          className="rounded-xl bg-blue-100 px-7 py-3"
        >
          <Text className="text-sm font-medium text-gray-700">{t("edit")}</Text>
        </Pressable>
      </View>

      {/* Content */}
      <View className="mt-4 flex-row">
        {/* Morning */}
        <View className="flex-1">
          <Text className="text-xs font-semibold uppercase text-gray-400">
            {t("morning")}
          </Text>

          <View className="mt-3 gap-2">
            <View className="flex-row">
              <Text className="w-12 text-sm text-gray-700">{t("cow")}</Text>

              <Text className="flex-1 text-xs text-gray-500">
                → {formatQuantity(record.morning_cow_qty)}
              </Text>
            </View>

            <View className="flex-row">
              <Text className="w-12 text-sm text-gray-700">{t("buffalo")}</Text>

              <Text className="flex-1 text-xs text-gray-500">
                → {formatQuantity(record.morning_buffalo_qty)}
              </Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View className="mx-4 w-px bg-gray-200" />

        {/* Night */}
        <View className="flex-1">
          <Text className="text-xs font-semibold uppercase text-gray-400">
            {t("night")}
          </Text>

          <View className="mt-3 gap-2">
            <View className="flex-row">
              <Text className="w-12 text-sm text-gray-700">{t("cow")}</Text>

              <Text className="flex-1 text-xs text-gray-500">
                → {formatQuantity(record.night_cow_qty)}
              </Text>
            </View>

            <View className="flex-row">
              <Text className="w-12 text-sm text-gray-700">{t("buffalo")}</Text>

              <Text className="flex-1 text-xs text-gray-500">
                → {formatQuantity(record.night_buffalo_qty)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
