import { View } from "react-native";

import { EditableQuantityCell } from "./EditableQuantityCell";

import { DailyRecord } from "../types";

import { updateQuantityField } from "../services/dailyRecordService";

import { Text } from "@/shared/ui/Text";

import { formatDisplayDate, getTodayDate } from "@/utils/date";

type Props = {
  record: DailyRecord;

  onRefresh: () => void;
};

export function DailyRecordCard({ record, onRefresh }: Props) {
  const isToday = record.date === getTodayDate();

  return (
    <View
      className={`rounded-2xl border p-4 ${
        isToday ? "border-red-200 bg-red-50" : "border-gray-200 bg-white"
      }`}
    >
      <View className="flex-row items-start justify-between">
        <View>
          <Text className="font-semibold">
            {formatDisplayDate(record.date)}
          </Text>

          {isToday && (
            <View className="mt-1 self-start rounded-full bg-red-100 px-2 py-1">
              <Text className="text-xs font-medium text-red-600">Today</Text>
            </View>
          )}

          <Text className="mt-1 text-sm text-gray-500">
            Total:{" "}
            {(
              record.morning_cow_qty +
              record.morning_buffalo_qty +
              record.night_cow_qty +
              record.night_buffalo_qty
            ).toFixed(1)}
            L
          </Text>
        </View>

        <Text className="font-bold text-red-600">₹ {record.total_amount}</Text>
      </View>

      <View className="mt-5">
        <View className="flex-row justify-between">
          <Text className="w-16 text-xs text-gray-500">MC</Text>

          <Text className="w-16 text-xs text-gray-500">MB</Text>

          <Text className="w-16 text-xs text-gray-500">NC</Text>

          <Text className="w-16 text-xs text-gray-500">NB</Text>
        </View>

        <View className="mt-2 flex-row justify-between">
          <EditableQuantityCell
            value={record.morning_cow_qty}
            onChange={(value) => {
              updateQuantityField(record.id, "morning_cow_qty", value);

              onRefresh();
            }}
          />

          <EditableQuantityCell
            value={record.morning_buffalo_qty}
            onChange={(value) => {
              updateQuantityField(record.id, "morning_buffalo_qty", value);

              onRefresh();
            }}
          />

          <EditableQuantityCell
            value={record.night_cow_qty}
            onChange={(value) => {
              updateQuantityField(record.id, "night_cow_qty", value);

              onRefresh();
            }}
          />

          <EditableQuantityCell
            value={record.night_buffalo_qty}
            onChange={(value) => {
              updateQuantityField(record.id, "night_buffalo_qty", value);

              onRefresh();
            }}
          />
        </View>
      </View>
    </View>
  );
}
