import { View } from "react-native";

import { Text } from "@/shared/ui/Text";
import { getMonthName } from "@/utils/months";
import { useTranslation } from "react-i18next";

type Props = {
  totalAmount: number;

  cowQuantity: number;

  buffaloQuantity: number;
};

export function HomeSummaryCard({
  totalAmount,
  cowQuantity,
  buffaloQuantity,
}: Props) {
  const { t, i18n } = useTranslation();

  const now = new Date();

  const month = now.getMonth() + 1;

  const year = now.getFullYear();

  return (
    <View className="rounded-3xl border border-red-200 bg-red-600 p-5">
      <View className="flex-row items-start justify-between">
        <View>
          <Text className="text-xl font-semibold text-white">
            {getMonthName(month, i18n.language)} {year}
          </Text>

          <Text className="mt-3 text-4xl font-bold text-white">
            ₹ {totalAmount.toFixed(0)}
          </Text>
        </View>

        <View className="items-end gap-5">
          <Text className="text-lg text-gray-100 font-semibold">
            {t("cow")} - {cowQuantity.toFixed(1)}L
          </Text>

          <Text className="text-lg text-gray-100 font-semibold">
            {t("buffalo")} - {buffaloQuantity.toFixed(1)}L
          </Text>
        </View>
      </View>
    </View>
  );
}
