import { Pressable } from "react-native";

import { Text } from "@/shared/ui/Text";
import { getQuantityLabel } from "@/utils/quantity";

type Props = {
  value: number | null;
  onPress: () => void;
};

export function QuantitySelectorButton({ value, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="h-12 flex-row items-center justify-between rounded-xl border border-gray-300 bg-white px-4"
    >
      <Text numberOfLines={1} className="flex-1 text-lg font-semibold">
        {value === null ? "Select quantity" : getQuantityLabel(value)}
      </Text>

      <Text className="text-lg text-gray-500">▼</Text>
    </Pressable>
  );
}
