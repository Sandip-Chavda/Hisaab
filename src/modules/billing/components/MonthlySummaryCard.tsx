import { View } from "react-native";

import { MonthlySummary } from "../types";

import { Text } from "@/shared/ui/Text";

type Props = {
  summary: MonthlySummary;
};

export function MonthlySummaryCard({ summary }: Props) {
  return (
    <View className="mt-6 rounded-3xl bg-red-600 p-5">
      <Text className="text-lg font-bold text-white">Monthly Summary</Text>

      <View className="mt-5 flex-row justify-between">
        <View>
          <Text className="text-sm text-red-100">Total Milk</Text>

          <Text className="mt-1 text-2xl font-bold text-white">
            {summary.totalQuantity.toFixed(1)} L
          </Text>
        </View>

        <View className="items-end">
          <Text className="text-sm text-red-100">Total Bill</Text>

          <Text className="mt-1 text-2xl font-bold text-white">
            ₹ {summary.totalAmount.toFixed(0)}
          </Text>
        </View>
      </View>

      <View className="mt-6 flex-row justify-between">
        <View>
          <Text className="text-red-100">
            MC: {summary.totalMorningCow.toFixed(1)}L
          </Text>

          <Text className="mt-1 text-red-100">
            MB: {summary.totalMorningBuffalo.toFixed(1)}L
          </Text>
        </View>

        <View className="items-end">
          <Text className="text-red-100">
            NC: {summary.totalNightCow.toFixed(1)}L
          </Text>

          <Text className="mt-1 text-red-100">
            NB: {summary.totalNightBuffalo.toFixed(1)}L
          </Text>
        </View>
      </View>
    </View>
  );
}
