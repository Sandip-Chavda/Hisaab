import { Tabs } from "expo-router";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#dc2626",

        tabBarInactiveTintColor: "#9ca3af",

        tabBarStyle: {
          height: 55,

          paddingTop: 0,

          paddingBottom: 5,

          borderTopWidth: 1,

          borderTopColor: "#f3f4f6",

          backgroundColor: "#ffffff",
        },

        tabBarLabelStyle: {
          fontSize: 12,

          fontWeight: "600",
        },
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

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
          title: "History",

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
          title: "Settings",

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
