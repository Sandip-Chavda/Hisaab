import { Pressable, ScrollView, View } from "react-native";

import { useState } from "react";

import { Screen } from "@/shared/ui/Screen";
import { Text } from "@/shared/ui/Text";

import { AddPresetModal } from "@/modules/milk-book/components/AddPresetModal";

import {
  createMilkRatePreset,
  deleteMilkRatePreset,
  getMilkRatePresets,
} from "@/modules/milk-book/services/milkRatePresetService";

import { getOrCreateCurrentMilkBook } from "@/modules/milk-book/services/currentMilkBookService";

import { getQuantityLabel } from "@/utils/quantity";
import Toast from "react-native-toast-message";

export default function SettingsScreen() {
  const milkBook = getOrCreateCurrentMilkBook();

  const milkBookId = milkBook?.id ?? 1;

  const [refreshKey, setRefreshKey] = useState(0);

  const [showCowModal, setShowCowModal] = useState(false);

  const [showBuffaloModal, setShowBuffaloModal] = useState(false);

  const cowPresets = getMilkRatePresets(milkBookId, "cow");

  const buffaloPresets = getMilkRatePresets(milkBookId, "buffalo");

  return (
    <Screen>
      <ScrollView key={refreshKey} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mt-2">
          <Text className="text-4xl font-bold">Settings</Text>

          <Text className="mt-2 text-gray-500">Manage milk rates</Text>
        </View>

        {/* Cow Milk */}
        <View className="mt-8">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold">Cow Milk</Text>

            <Pressable
              onPress={() => setShowCowModal(true)}
              className="rounded-full bg-red-500 px-4 py-2"
            >
              <Text className="text-white">Add</Text>
            </Pressable>
          </View>

          <View className="mt-4 gap-3">
            {cowPresets.map((item) => (
              <View
                key={item.id}
                className="rounded-2xl border border-gray-200 bg-white p-4"
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="font-semibold">
                      {getQuantityLabel(item.quantity)}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-3">
                    <Text className="text-lg font-bold text-red-600">
                      ₹ {item.price}
                    </Text>

                    <Pressable
                      onPress={() => {
                        deleteMilkRatePreset(item.id);
                        Toast.show({
                          type: "success",

                          text1: "Preset Deleted",

                          text2: "Milk rate removed",
                        });

                        setRefreshKey((prev) => prev + 1);
                      }}
                      className="rounded-full bg-red-100 px-3 py-2"
                    >
                      <Text className="text-xs font-semibold text-red-600">
                        Delete
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Buffalo Milk */}
        <View className="mt-10 mb-20">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold">Buffalo Milk</Text>

            <Pressable
              onPress={() => setShowBuffaloModal(true)}
              className="rounded-full bg-red-500 px-4 py-2"
            >
              <Text className="text-white">Add</Text>
            </Pressable>
          </View>

          <View className="mt-4 gap-3">
            {buffaloPresets.map((item) => (
              <View
                key={item.id}
                className="rounded-2xl border border-gray-200 bg-white p-4"
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="font-semibold">
                      {getQuantityLabel(item.quantity)}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-3">
                    <Text className="text-lg font-bold text-red-600">
                      ₹ {item.price}
                    </Text>

                    <Pressable
                      onPress={() => {
                        deleteMilkRatePreset(item.id);
                        Toast.show({
                          type: "success",

                          text1: "Preset Deleted",

                          text2: "Milk rate removed",
                        });

                        setRefreshKey((prev) => prev + 1);
                      }}
                      className="rounded-full bg-red-100 px-3 py-2"
                    >
                      <Text className="text-xs font-semibold text-red-600">
                        Delete
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Cow Modal */}
        <AddPresetModal
          visible={showCowModal}
          milkType="cow"
          onClose={() => setShowCowModal(false)}
          onSave={(quantity, price) => {
            const result = createMilkRatePreset(
              milkBookId,
              "cow",
              quantity,
              price,
            );

            Toast.show({
              type: "success",

              text1: result === "updated" ? "Preset Updated" : "Preset Added",

              text2:
                result === "updated"
                  ? "Existing price changed"
                  : "New milk rate saved",
            });

            setRefreshKey((prev) => prev + 1);
          }}
        />

        {/* Buffalo Modal */}
        <AddPresetModal
          visible={showBuffaloModal}
          milkType="buffalo"
          onClose={() => setShowBuffaloModal(false)}
          onSave={(quantity, price) => {
            const result = createMilkRatePreset(
              milkBookId,
              "buffalo",
              quantity,
              price,
            );

            Toast.show({
              type: "success",

              text1: result === "updated" ? "Preset Updated" : "Preset Added",

              text2:
                result === "updated"
                  ? "Existing price changed"
                  : "New milk rate saved",
            });

            setRefreshKey((prev) => prev + 1);
          }}
        />
      </ScrollView>
    </Screen>
  );
}
