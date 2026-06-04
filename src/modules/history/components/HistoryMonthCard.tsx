import { Alert, Pressable, View } from "react-native";

import { router } from "expo-router";

import { getDailyRecords } from "@/modules/daily-record/services/dailyRecordService";
import { downloadInvoicePdf } from "@/modules/invoice/services/pdfInvoiceService";
import { getOrCreateCurrentMilkBook } from "@/modules/milk-book/services/currentMilkBookService";
import { Text } from "@/shared/ui/Text";
import { formatIndianCurrency } from "@/utils/currency";
import { getMonthName } from "@/utils/months";
import { useTranslation } from "react-i18next";

type Props = {
  month: number;

  year: number;

  totalAmount: number;
};

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function HistoryMonthCard({ month, year, totalAmount }: Props) {
  const now = new Date();

  const currentMonth = now.getMonth() + 1;

  const currentYear = now.getFullYear();

  const isCurrentMonth =
    Number(month) === currentMonth && Number(year) === currentYear;

  const { t, i18n } = useTranslation();

  function openMonth() {
    router.push({
      pathname: "/history-month",

      params: {
        month,
        year,
      },
    });
  }

  async function handleInvoice() {
    const milkBook = getOrCreateCurrentMilkBook();

    if (!milkBook) {
      return;
    }

    const records = getDailyRecords(milkBook.id, month, year);

    Alert.alert(
      "Invoice",
      `${getMonthName(month, i18n.language)} ${year}`,

      [
        {
          text: "Download Bill",

          onPress: async () => {
            await downloadInvoicePdf(
              // MONTH_NAMES[month - 1],
              getMonthName(month, i18n.language),
              String(year),
              records,
            );
          },
        },

        {
          text: "Close",

          style: "cancel",
        },
      ],
    );
  }

  return (
    <View
      className={`rounded-3xl border p-5 ${
        isCurrentMonth ? "border-red-200 bg-red-50" : "border-gray-200 bg-white"
      }`}
    >
      {/* Top */}
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-bold">
            {getMonthName(month, i18n.language)} {year}
          </Text>

          {isCurrentMonth && (
            <View className="mt-2 self-start rounded-full bg-red-100 px-2 py-1">
              <Text className="text-[10px] font-medium text-red-600">
                {t("currentMonth")}
              </Text>
            </View>
          )}

          <Text className="mt-2 text-gray-500">{t("monthlyArchive")}</Text>
        </View>

        <View className="items-end">
          <Text className="text-xs text-gray-500">Total</Text>

          <Text className="mt-1 text-xl font-bold text-red-600">
            ₹ {formatIndianCurrency(totalAmount)}
          </Text>
        </View>
      </View>

      {/* Actions */}
      <View className="mt-5 flex-row gap-3">
        {/* Open */}
        <Pressable
          onPress={openMonth}
          className="flex-1 rounded-2xl bg-black px-4 py-3"
        >
          <Text className="text-center font-semibold text-white">
            {t("open")}
          </Text>
        </Pressable>

        {/* Invoice */}
        {!isCurrentMonth && (
          <Pressable
            onPress={handleInvoice}
            className="flex-1 rounded-2xl bg-red-500 px-4 py-3"
          >
            <Text className="text-center font-semibold text-white">
              {t("invoice")}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
