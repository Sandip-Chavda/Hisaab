import { useEffect, useState } from "react";
import { TextInput, View } from "react-native";

import { Text } from "@/shared/ui/Text";

type Props = {
  label: string;

  value: number;

  onChange: (value: number) => void;
};

export function EditableQuantityCell({ label, value, onChange }: Props) {
  const [inputValue, setInputValue] = useState(String(value || ""));

  useEffect(() => {
    setInputValue(value ? String(value) : "");
  }, [value]);

  return (
    <View className="mt-2">
      <Text className="text-sm text-gray-500">{label}</Text>

      <TextInput
        keyboardType="decimal-pad"
        value={inputValue}
        onChangeText={(text) => {
          setInputValue(text);

          const parsed = parseFloat(text) || 0;

          onChange(parsed);
        }}
        placeholder="0"
        className="mt-1 rounded-xl border border-gray-200 px-3 py-2"
      />
    </View>
  );
}
