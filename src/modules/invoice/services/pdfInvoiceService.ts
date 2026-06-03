import * as Print from "expo-print";

import * as FileSystem from "expo-file-system/legacy";

import { Alert } from "react-native";

import { generateInvoiceHtml } from "./invoiceService";

import { DailyRecord } from "@/modules/daily-record/types";

export async function downloadInvoicePdf(
  month: string,

  year: string,

  records: DailyRecord[],
) {
  try {
    const html = generateInvoiceHtml(month, year, records);

    // Generate PDF
    const pdf = await Print.printToFileAsync({
      html,
    });

    // Ask folder access
    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (!permissions.granted) {
      Alert.alert("Permission Required", "Please allow folder access.");

      return;
    }

    // Read temp PDF
    const base64 = await FileSystem.readAsStringAsync(pdf.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const fileName = `Invoice-${month}-${year}.pdf`;

    // Create actual file
    const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
      permissions.directoryUri,
      fileName,
      "application/pdf",
    );

    // Write file
    await FileSystem.writeAsStringAsync(fileUri, base64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    Alert.alert("Invoice Downloaded", `${fileName} saved successfully.`);
  } catch (error) {
    console.log(error);

    Alert.alert("Error", "Failed to download invoice PDF.");
  }
}
