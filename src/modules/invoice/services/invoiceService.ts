import { DailyRecord } from "@/modules/daily-record/types";

import i18n from "@/localization/i18n";

import { formatIndianCurrency } from "@/utils/currency";
import { getMonthName } from "@/utils/months";

function formatQty(value: number | null) {
  if (value === null) {
    return "-";
  }

  return `${value}L`;
}

export function generateInvoiceHtml(
  month: string,

  year: string,

  records: DailyRecord[],
) {
  const totalAmount = records.reduce((sum, item) => sum + item.total_amount, 0);

  return `
  <html>
    <head>
      <style>
        body {
          font-family: Arial;
          padding: 20px;
        }

        h1 {
          text-align: center;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: center;
          font-size: 12px;
        }

        .footer {
          margin-top: 20px;
          text-align: right;
          font-size: 18px;
          font-weight: bold;
        }
      </style>
    </head>

    <body>
      <h1>
        ${i18n.t("milkInvoice")}
      </h1>

      <p>
        ${getMonthName(Number(month), i18n.language)} ${year}
      </p>

      <table>
        <tr>
          <th>No</th>

          <th>
            ${i18n.t("date")}
          </th>

          <th>
            ${i18n.t("morning")} ${i18n.t("cow")}
          </th>

          <th>
            ${i18n.t("morning")} ${i18n.t("buffalo")}
          </th>

          <th>
            ${i18n.t("night")} ${i18n.t("cow")}
          </th>

          <th>
            ${i18n.t("night")} ${i18n.t("buffalo")}
          </th>

          <th>
            ${i18n.t("price")}
          </th>
        </tr>

        ${records
          .map(
            (item, index) => `
            <tr>
              <td>
                ${index + 1}
              </td>

              <td>
                ${item.date}
              </td>

              <td>
                ${formatQty(item.morning_cow_qty)}
              </td>

              <td>
                ${formatQty(item.morning_buffalo_qty)}
              </td>

              <td>
                ${formatQty(item.night_cow_qty)}
              </td>

              <td>
                ${formatQty(item.night_buffalo_qty)}
              </td>

              <td>
                ₹${formatIndianCurrency(item.total_amount)}
              </td>
            </tr>
          `,
          )
          .join("")}
      </table>

      <div class="footer">
        ${i18n.t("grandTotal")}: ₹${formatIndianCurrency(totalAmount)}
      </div>
    </body>
  </html>
  `;
}
