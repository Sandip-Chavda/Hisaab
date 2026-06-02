import { useEffect, useState } from "react";
import { TextInput, View } from "react-native";

import { styled } from "nativewind";

const StyledTextInput = styled(TextInput);

type Props = {
  value: number;

  onChange: (value: number) => void;
};

export function EditableQuantityCell({ value, onChange }: Props) {
  const [inputValue, setInputValue] = useState(value ? String(value) : "");

  useEffect(() => {
    setInputValue(value ? String(value) : "");
  }, [value]);

  return (
    <View className="w-16">
      <StyledTextInput
        keyboardType="decimal-pad"
        value={inputValue}
        onChangeText={(text) => {
          setInputValue(text);

          const parsed = parseFloat(text) || 0;

          onChange(parsed);
        }}
        placeholder="0"
        className="rounded-xl border border-gray-200 bg-gray-50 px-2 py-2 text-center text-base"
      />
    </View>
  );
}
