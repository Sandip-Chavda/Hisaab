import { Pressable, PressableProps } from "react-native";

import { Text } from "./Text";

type ButtonProps = PressableProps & {
  title: string;
};

export function Button({ title, ...props }: ButtonProps) {
  return (
    <Pressable
      className="items-center rounded-2xl bg-red-600 px-4 py-4"
      {...props}
    >
      <Text className="text-base font-semibold text-white">{title}</Text>
    </Pressable>
  );
}
