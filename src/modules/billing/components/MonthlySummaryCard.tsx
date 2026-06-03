import { View } from "react-native";

import { Text } from "@/shared/ui/Text";

export function HomeSummaryCard() {
  return (
    <View className="rounded-[32px] bg-red-100 p-6">
      {/* Month */}
      <View className="flex-row items-start justify-between">
        <View>
          <Text className="text-sm text-red-700">Current Month</Text>

          <Text className="mt-1 text-3xl font-bold text-black">June 2026</Text>
        </View>

        <View className="rounded-2xl bg-white px-4 py-2">
          <Text className="text-xs text-gray-500">Total</Text>

          <Text className="mt-1 text-lg font-bold text-red-600">₹ 0</Text>
        </View>
      </View>

      {/* Stats */}
      <View className="mt-6 flex-row gap-3">
        {/* Cow */}
        <View className="flex-1 rounded-2xl bg-white p-4">
          <Text className="text-sm text-gray-500">Cow Milk</Text>

          <Text className="mt-3 text-2xl font-bold">0L</Text>

          <Text className="mt-1 text-sm text-gray-500">₹ 0</Text>
        </View>

        {/* Buffalo */}
        <View className="flex-1 rounded-2xl bg-white p-4">
          <Text className="text-sm text-gray-500">Buffalo Milk</Text>

          <Text className="mt-3 text-2xl font-bold">0L</Text>

          <Text className="mt-1 text-sm text-gray-500">₹ 0</Text>
        </View>
      </View>
    </View>
  );
}
