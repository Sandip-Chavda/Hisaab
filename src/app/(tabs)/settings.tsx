import { Pressable, ScrollView, View } from "react-native";

import { useState } from "react";

import { Screen } from "@/shared/ui/Screen";
import { Text } from "@/shared/ui/Text";

import { AddPresetModal } from "@/modules/milk-book/components/AddPresetModal";

import {
  createMilkRatePreset,
  getMilkRatePresets,
} from "@/modules/milk-book/services/milkRatePresetService";

import { getOrCreateCurrentMilkBook } from "@/modules/milk-book/services/currentMilkBookService";

import { getQuantityLabel } from "@/utils/quantity";

export default function SettingsScreen() {
  const milkBook = getOrCreateCurrentMilkBook();

  const milkBookId = milkBook?.id ?? 1;

  const [showCowModal, setShowCowModal] = useState(false);

  const [showBuffaloModal, setShowBuffaloModal] = useState(false);

  const cowPresets = getMilkRatePresets(milkBookId, "cow");

  const buffaloPresets = getMilkRatePresets(milkBookId, "buffalo");

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mt-2">
          <Text className="text-4xl font-bold">Settings</Text>

          <Text className="mt-2 text-gray-500">Manage milk rates</Text>
        </View>

        {/* Cow */}
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
                  <View>
                    <Text className="font-semibold">
                      {item.quantity}L — {getQuantityLabel(item.quantity)}
                    </Text>
                  </View>

                  <Text className="text-lg font-bold text-red-600">
                    ₹ {item.price}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Buffalo */}
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
                  <View>
                    <Text className="font-semibold">
                      {item.quantity}L — {getQuantityLabel(item.quantity)}
                    </Text>
                  </View>

                  <Text className="text-lg font-bold text-red-600">
                    ₹ {item.price}
                  </Text>
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
            createMilkRatePreset(milkBookId, "cow", quantity, price);
          }}
        />

        {/* Buffalo Modal */}
        <AddPresetModal
          visible={showBuffaloModal}
          milkType="buffalo"
          onClose={() => setShowBuffaloModal(false)}
          onSave={(quantity, price) => {
            createMilkRatePreset(milkBookId, "buffalo", quantity, price);
          }}
        />
      </ScrollView>
    </Screen>
  );
}
