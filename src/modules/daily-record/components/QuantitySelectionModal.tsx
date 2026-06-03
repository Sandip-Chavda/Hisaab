import { Modal, Pressable, View } from "react-native";

import { MilkRatePreset } from "@/modules/milk-book/types/milkRatePreset";

import { Text } from "@/shared/ui/Text";

import { getQuantityLabel } from "@/utils/quantity";
import { useTranslation } from "react-i18next";

type Props = {
  visible: boolean;

  presets: MilkRatePreset[];

  onClose: () => void;

  onSelect: (quantity: number) => void;
};

export function QuantitySelectionModal({
  visible,
  presets,
  onClose,
  onSelect,
}: Props) {
  const { t, i18n } = useTranslation();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable
        className="flex-1 items-center justify-center px-6"
        style={{
          backgroundColor: "rgba(0,0,0,0.75)",
        }}
        onPress={onClose}
      >
        <Pressable
          className="w-full rounded-3xl bg-white p-5"
          onPress={() => {}}
        >
          <Text className="text-lg font-bold">{t("selectQuantity")}</Text>

          <View className="mt-5 gap-3">
            {presets.map((preset) => (
              <Pressable
                key={preset.id}
                onPress={() => {
                  onSelect(preset.quantity);

                  onClose();
                }}
                className="rounded-2xl border border-gray-200 p-4"
              >
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-lg font-semibold">
                      {preset.quantity}L
                    </Text>

                    <Text className="mt-1 text-sm text-gray-500">
                      {getQuantityLabel(preset.quantity, i18n.language)}
                    </Text>
                  </View>

                  <Text className="text-lg font-bold text-red-600">
                    ₹ {preset.price}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
