import { View } from "react-native";

import { Screen } from "@/shared/ui/Screen";
import { Text } from "@/shared/ui/Text";

export default function HistoryScreen() {
  return (
    <Screen>
      <View className="mt-6">
        <Text className="text-4xl font-bold">History</Text>
      </View>
    </Screen>
  );
}
