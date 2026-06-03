import { DailyRecord } from "@/modules/daily-record/types";

function formatQty(value: number | null) {
  if (value === null) {
    return "-";
  }

  if (value === 0) {
    return "રાજા";
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
        Hisaab Milk Invoice
      </h1>

      <p>
        ${month} ${year}
      </p>

      <table>
        <tr>
          <th>No</th>
          <th>Date</th>

          <th>Morning Cow</th>
          <th>Morning Buffalo</th>

          <th>Night Cow</th>
          <th>Night Buffalo</th>

          <th>Price</th>
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
                ₹${item.total_amount}
              </td>
            </tr>
          `,
          )
          .join("")}
      </table>

      <div class="footer">
        Total: ₹${totalAmount}
      </div>
    </body>
  </html>
  `;
}
