import * as Print from "expo-print";

import * as FileSystem from "expo-file-system/legacy";

import { Alert } from "react-native";

import { generateInvoiceHtml } from "./invoiceService";

import i18n from "@/localization/i18n";

import { DailyRecord } from "@/modules/daily-record/types";

export async function downloadInvoicePdf(
  month: string,

  year: string,

  records: DailyRecord[],
) {
  try {
    // Generate invoice HTML
    const html = generateInvoiceHtml(month, year, records);

    // Generate PDF
    const pdf = await Print.printToFileAsync({
      html,
    });

    const fileName = `Invoice-${month}-${year}.pdf`;

    // Ask user folder access
    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (!permissions.granted) {
      Alert.alert(
        i18n.t("permissionRequired"),

        i18n.t("allowFolderAccess"),
      );

      return;
    }

    // Read generated PDF
    const base64 = await FileSystem.readAsStringAsync(pdf.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Create file in selected folder
    const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
      permissions.directoryUri,

      fileName,

      "application/pdf",
    );

    // Write PDF
    await FileSystem.writeAsStringAsync(fileUri, base64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    Alert.alert(
      i18n.t("invoiceDownloaded"),

      `${fileName} ${i18n.t("savedSuccessfully")}.`,
    );
  } catch (error) {
    console.log(error);

    Alert.alert(
      i18n.t("error"),

      i18n.t("failedInvoice"),
    );
  }
}
