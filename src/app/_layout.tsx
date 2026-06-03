import { initDatabase } from "@/database";
import { Stack } from "expo-router";
import "../../global.css";

initDatabase();

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
