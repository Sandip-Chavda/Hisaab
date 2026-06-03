import { View } from "react-native";

import { Text } from "@/shared/ui/Text";

export function NotebookCard() {
  return (
    <View className="mt-6 flex-1 rounded-[32px] border border-green-200 bg-green-50 p-6">
      <Text className="text-lg font-semibold text-gray-700">
        Add today's record here
      </Text>
    </View>
  );
}
