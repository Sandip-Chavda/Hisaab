import { View } from "react-native";

import { Screen } from "@/shared/ui/Screen";
import { Text } from "@/shared/ui/Text";

export default function HomeScreen() {
  return (
    <Screen>
      <View className="mt-6">
        <Text className="text-4xl font-bold">Hisaab</Text>

        <Text className="mt-2 text-gray-500">June 2026</Text>
      </View>
    </Screen>
  );
}
