import { Modal, Pressable, TextInput, View } from "react-native";

import { useState } from "react";

import { useTranslation } from "react-i18next";

import { Text } from "@/shared/ui/Text";

import { QUANTITY_OPTIONS, getQuantityLabel } from "@/utils/quantity";

type Props = {
  visible: boolean;

  milkType: "cow" | "buffalo";

  onClose: () => void;

  onSave: (quantity: number, price: number) => void;
};

export function AddPresetModal({ visible, milkType, onClose, onSave }: Props) {
  const [selectedQty, setSelectedQty] = useState<number | null>(null);

  const [price, setPrice] = useState("");

  const { t, i18n } = useTranslation();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        className="flex-1 items-center justify-center px-5"
        style={{
          backgroundColor: "rgba(0,0,0,0.75)",
        }}
      >
        <View className="w-full rounded-3xl bg-white p-5">
          <Text className="text-2xl font-bold">{t("selectAndAddPrice")}</Text>

          <Text className="mt-2 text-gray-500">
            {milkType === "cow" ? t("cowMilk") : t("buffaloMilk")}
          </Text>

          {/* Quantity */}
          <View className="mt-5">
            <Text className="mb-3 text-sm font-medium text-gray-600">
              {t("quantity")}
            </Text>

            <View className="flex-row flex-wrap gap-2">
              {QUANTITY_OPTIONS.map((item) => (
                <Pressable
                  key={item.value}
                  onPress={() => setSelectedQty(item.value)}
                  className={`rounded-full border px-4 py-2 ${
                    selectedQty === item.value
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      selectedQty === item.value
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {getQuantityLabel(item.value, i18n.language)}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Price */}
          <View className="mt-5">
            <Text className="mb-3 text-sm font-medium text-gray-600">
              {t("price")}
            </Text>

            <TextInput
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              placeholder={t("placeholderPrice")}
              className="rounded-2xl border border-gray-200 px-4 py-3"
            />
          </View>

          {/* Actions */}
          <View className="mt-6 flex-row justify-end gap-3">
            <Pressable
              onPress={onClose}
              className="rounded-full bg-gray-100 px-5 py-3"
            >
              <Text>{t("cancel")}</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                if (selectedQty === null || !price) {
                  return;
                }

                onSave(selectedQty, Number(price));

                setPrice("");
                setSelectedQty(null);

                onClose();
              }}
              className="rounded-full bg-red-500 px-5 py-3"
            >
              <Text className="text-white">{t("save")}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
