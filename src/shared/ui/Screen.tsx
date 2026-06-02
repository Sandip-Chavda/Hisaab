import { View } from "react-native";

import { SafeAreaView } from "./SafeAreaView";

type ScreenProps = {
  children: React.ReactNode;
};

export function Screen({ children }: ScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4">{children}</View>
    </SafeAreaView>
  );
}
