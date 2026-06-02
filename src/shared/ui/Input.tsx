import { TextInput, TextInputProps } from "react-native";

export function Input(props: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor="#999"
      className="rounded-2xl border border-gray-200 px-4 py-4 text-base"
      {...props}
    />
  );
}
