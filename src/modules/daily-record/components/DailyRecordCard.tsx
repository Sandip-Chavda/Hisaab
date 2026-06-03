import { View } from "react-native";

import { DailyRecord } from "../types";

import { Text } from "@/shared/ui/Text";

import { getMilkRatePresets } from "@/modules/milk-book/services/milkRatePresetService";
import { formatDisplayDate, getTodayDate } from "@/utils/date";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { updateQuantityField } from "../services/dailyRecordService";
import { QuantitySelectionModal } from "./QuantitySelectionModal";
import { QuantitySelectorButton } from "./QuantitySelectorButton";

type Props = {
  record: DailyRecord;
  onRefresh: () => void;
  milkBookId: number;
};

export function DailyRecordCard({ record, onRefresh, milkBookId }: Props) {
  const [selectedField, setSelectedField] = useState<
    | "morning_cow_qty"
    | "morning_buffalo_qty"
    | "night_cow_qty"
    | "night_buffalo_qty"
    | null
  >(null);

  const [activePresets, setActivePresets] = useState<any[]>([]);

  const { t, i18n } = useTranslation();

  const isToday = record.date === getTodayDate();

  return (
    <View
      className={`rounded-3xl border p-5 ${
        isToday ? "border-red-200 bg-red-50" : "border-gray-200 bg-white"
      }`}
    >
      <View className="flex-row items-start justify-between">
        <View>
          <Text className="text-lg font-bold">
            {formatDisplayDate(record.date)}
          </Text>

          {isToday && (
            <View className="mt-1 self-start rounded-full bg-red-100 px-2 py-1">
              <Text className="text-xs font-medium text-red-600">
                {t("today")}
              </Text>
            </View>
          )}
        </View>

        <View className="items-end">
          <Text className="text-lg font-bold text-red-600">
            ₹ {record.total_amount}
          </Text>

          <Text className="mt-1 text-sm text-gray-500">
            {(
              (record.morning_cow_qty || 0) +
              (record.morning_buffalo_qty || 0) +
              (record.night_cow_qty || 0) +
              (record.night_buffalo_qty || 0)
            ).toFixed(1)}
            L
          </Text>
        </View>
      </View>

      <View className="mt-4">
        {/* Morning */}
        <View>
          <Text className="text-center text-sm font-semibold text-gray-600">
            {t("morning")}
          </Text>

          <View className="mt-3 gap-3">
            {/* Cow */}
            <View>
              <Text className="mb-2 text-lg text-gray-600 font-semibold">
                {t("cow")}
              </Text>

              <QuantitySelectorButton
                value={record.morning_cow_qty}
                onPress={() => {
                  setActivePresets(getMilkRatePresets(milkBookId, "cow"));

                  setSelectedField("morning_cow_qty");
                }}
              />
            </View>

            {/* Buffalo */}
            <View>
              <Text className="mb-2 text-lg text-gray-600 font-semibold">
                {t("buffalo")}
              </Text>

              <QuantitySelectorButton
                value={record.morning_buffalo_qty}
                onPress={() => {
                  setActivePresets(getMilkRatePresets(milkBookId, "buffalo"));

                  setSelectedField("morning_buffalo_qty");
                }}
              />
            </View>
          </View>
        </View>

        {/* Divider */}
        <View className="my-4 items-center">
          <View className="h-1 w-24 rounded-full bg-gray-300" />
        </View>

        {/* Night */}
        <View>
          <Text className="text-center text-sm font-semibold text-gray-600">
            {t("night")}
          </Text>

          <View className="mt-3 gap-3">
            {/* Cow */}
            <View>
              <Text className="mb-2 text-lg text-gray-600 font-semibold">
                {t("cow")}
              </Text>

              <QuantitySelectorButton
                value={record.night_cow_qty}
                onPress={() => {
                  setActivePresets(getMilkRatePresets(milkBookId, "cow"));

                  setSelectedField("night_cow_qty");
                }}
              />
            </View>

            {/* Buffalo */}
            <View>
              <Text className="mb-2 text-lg text-gray-600 font-semibold">
                {t("buffalo")}
              </Text>

              <QuantitySelectorButton
                value={record.night_buffalo_qty}
                onPress={() => {
                  setActivePresets(getMilkRatePresets(milkBookId, "buffalo"));

                  setSelectedField("night_buffalo_qty");
                }}
              />
            </View>
          </View>
        </View>
      </View>

      <QuantitySelectionModal
        visible={!!selectedField}
        presets={activePresets}
        onClose={() => {
          setSelectedField(null);
        }}
        onSelect={(quantity) => {
          if (!selectedField) return;

          const milkType = selectedField.includes("buffalo")
            ? "buffalo"
            : "cow";

          updateQuantityField(
            milkBookId,
            record.id,
            selectedField,
            milkType,
            quantity,
          );

          onRefresh();
        }}
      />
    </View>
  );
}
