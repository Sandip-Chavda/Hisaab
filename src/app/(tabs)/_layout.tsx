import { Tabs } from "expo-router";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#e7000b",

        tabBarInactiveTintColor: "#9ca3af",

        tabBarStyle: {
          paddingTop: 0,

          paddingBottom: insets.bottom,

          height: 65 + insets.bottom,

          borderTopWidth: 1,

          borderTopColor: "#f3f4f6",

          backgroundColor: "#ffffff",
        },

        tabBarLabelStyle: {
          fontSize: 12,

          fontWeight: "700",
        },
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: t("home"),

          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* History */}
      <Tabs.Screen
        name="history"
        options={{
          title: t("history"),

          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "clock-edit" : "clock-edit-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Settings */}
      <Tabs.Screen
        name="settings"
        options={{
          title: t("settings"),

          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "settings-sharp" : "settings-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
