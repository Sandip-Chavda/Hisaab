import { initDatabase } from "@/database";
import "@/localization/i18n";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import "../../global.css";

initDatabase();

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />

      <Toast />
    </>
  );
}
