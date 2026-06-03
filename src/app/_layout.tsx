import { initDatabase } from "@/database";
import "@/localization/i18n";
import { initI18n } from "@/localization/i18n";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import "../../global.css";

initDatabase();

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function setup() {
      await initI18n();

      setReady(true);
    }

    setup();
  }, []);

  if (!ready) {
    return null;
  }

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
