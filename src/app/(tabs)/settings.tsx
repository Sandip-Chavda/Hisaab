import { View } from "react-native";

import { Screen } from "@/shared/ui/Screen";
import { Text } from "@/shared/ui/Text";

export default function SettingsScreen() {
  return (
    <Screen>
      <View className="mt-2">
        <Text className="text-4xl font-bold">Settings</Text>
      </View>
    </Screen>
  );
}
