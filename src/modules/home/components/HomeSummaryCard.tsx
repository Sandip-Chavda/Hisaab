import { View } from "react-native";

import { Text } from "@/shared/ui/Text";

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
  return (
    <View className="rounded-3xl border border-red-200 bg-red-700 p-5">
      <View className="flex-row items-start justify-between">
        <View>
          <Text className="text-xl font-semibold text-white">June 2026</Text>

          <Text className="mt-3 text-4xl font-bold text-white">
            ₹ {totalAmount.toFixed(0)}
          </Text>
        </View>

        <View className="items-end gap-5">
          <Text className="text-lg text-gray-100 font-semibold">
            Cow - {cowQuantity.toFixed(1)}L
          </Text>

          <Text className="text-lg text-gray-100 font-semibold">
            Buffalo - {buffaloQuantity.toFixed(1)}L
          </Text>
        </View>
      </View>
    </View>
  );
}
