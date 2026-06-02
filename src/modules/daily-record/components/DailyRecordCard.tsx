import { View } from "react-native";

import { DailyRecord } from "../types";

import { Text } from "@/shared/ui/Text";

import { formatDisplayDate } from "@/utils/date";
import { updateMorningCowQty } from "../services/dailyRecordService";
import { EditableQuantityCell } from "./EditableQuantityCell";

type Props = {
  record: DailyRecord;
};

export function DailyRecordCard({ record }: Props) {
  return (
    <View className="rounded-2xl border border-gray-200 bg-white p-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-semibold">
          {formatDisplayDate(record.date)}
        </Text>

        <Text className="font-semibold text-red-600">
          ₹ {record.total_amount}
        </Text>
      </View>

      <View className="mt-4 flex-row justify-between">
        <View>
          <Text className="text-sm text-gray-500">Morning</Text>

          <EditableQuantityCell
            label="Cow"
            value={record.morning_cow_qty}
            onChange={(value) => {
              updateMorningCowQty(record.id, value);

              record.morning_cow_qty = value;
            }}
          />

          <Text className="mt-1">Buffalo: {record.morning_buffalo_qty}L</Text>
        </View>

        <View>
          <Text className="text-sm text-gray-500">Night</Text>

          <Text className="mt-2">Cow: {record.night_cow_qty}L</Text>

          <Text className="mt-1">Buffalo: {record.night_buffalo_qty}L</Text>
        </View>
      </View>
    </View>
  );
}
