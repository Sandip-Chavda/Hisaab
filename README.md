# <div align="center">

<img src="./assets/banner.png" alt="Hisaab Banner" />

# 🥛 Hisaab - Offline First Architecture

### Personal Milk Billing Tracker

A modern offline-first milk register app for households and families.

<img src="https://img.shields.io/badge/Expo-React%20Native-black?style=for-the-badge&logo=expo" />
<img src="https://img.shields.io/badge/Offline%20First-SQLite-red?style=for-the-badge" />
<img src="https://img.shields.io/badge/Platform-Android-white?style=for-the-badge" />

</div>

---

# ✨ Overview

Hisaab is a minimal and modern milk billing tracker inspired by traditional household milk notebooks.

Track daily milk entries, calculate monthly bills, and generate invoices — all offline.

Designed for:

- 🏠 Families
- 🥛 Daily milk buyers
- 📒 Traditional milk register users
- 🌾 Village & city households

---

# 📱 Screenshots

<div align="center">

<table>
  <tr>
    <td align="center">
      <b>Splash Screen</b><br/>
      <img src="./assets/screens/SplashScreen.jpg" width="150"/>
    </td>
    <td align="center">
      <b>Home Guj</b><br/>
      <img src="./assets/screens/HomeScreenGuj.jpg" width="150"/>
    </td>
    <td align="center">
      <b>Records Guj</b><br/>
      <img src="./assets/screens/RecordScreenGuj.jpg" width="150"/>
    </td>
    <td align="center">
      <b>Settings Guj</b><br/>
      <img src="./assets/screens/SettingsScreenGuj.jpg" width="150"/>
    </td>
  </tr>

  <tr>
    <td align="center">
      <b>Add Prices Guj</b><br/>
      <img src="./assets/screens/AddPriceScreenGuj.jpg" width="150"/>
    </td>
    <td align="center">
      <b>Select Quantity Guj</b><br/>
      <img src="./assets/screens/SelectQuantityGuj.jpg" width="150"/>
    </td>
    <td align="center">
      <b>Monthly Records Guj</b><br/>
      <img src="./assets/screens/MonthlyRecordGuj.jpg" width="150"/>
    </td>
    <td align="center">
      <b>Home En</b><br/>
      <img src="./assets/screens/HomeScreenEn.jpg" width="150"/>
    </td>
  </tr>

  <tr>
  <td align="center">
      <b>Records En</b><br/>
      <img src="./assets/screens/RecordScreenEn.jpg" width="150"/>
    </td>
    <td align="center">
      <b>Settings En</b><br/>
      <img src="./assets/screens/SettingsScreenEn.jpg" width="150"/>
    </td>
    <td align="center">
      <b>Add Price En</b><br/>
      <img src="./assets/screens/AddPriceScreenEn.jpg" width="150"/>
    </td>
    <td align="center">
      <b>Seelct Quntity En</b><br/>
      <img src="./assets/screens/SelectQuantityEn.jpg" width="150"/>
    </td>
  </tr>
</table>

</div>

---

# 🎥 Demo

> Add your demo video or GIF here

---

# 🚀 Features

## 🥛 Daily Milk Register

Track:

- Morning Cow Milk
- Morning Buffalo Milk
- Night Cow Milk
- Night Buffalo Milk

---

## 📒 Notebook-Like Experience

- One day = one row
- Extremely fast entry flow
- Minimal typing
- Clean layout

---

## 💰 Automatic Billing

- Auto total calculation
- Monthly summaries
- Historical pricing support
- Indian number formatting

Examples:

```txt
1,000
10,000
1,00,000
```

---

## 🧾 PDF Invoice Generation

Generate clean monthly invoices directly from the app.

Features:

- Table-based invoice layout
- Localized labels
- Offline PDF generation
- Android folder save support

---

## 🌍 Localization

Currently supports:

- 🇬🇧 English
- 🇮🇳 Gujarati

Dynamic language switching supported.

---

## 📦 Offline First

Everything works fully offline using SQLite.

No internet required.

---

# 🧠 Smart Quantity Logic

| State  | Meaning                      |
| ------ | ---------------------------- |
| `null` | untouched / not entered      |
| `0`    | Raja / intentionally no milk |
| `>0`   | milk quantity                |

Invoice behavior:

| Value     | Display       |
| --------- | ------------- |
| untouched | `-`           |
| Raja      | `0L`          |
| quantity  | actual liters |

---

# 🏗️ Tech Stack

## Frontend

- React Native
- Expo
- Expo Router
- TypeScript
- NativeWind

## Database

- expo-sqlite
- Offline-first architecture

## Localization

- i18next

## PDF

- expo-print
- expo-file-system

---

# 🎨 Design Philosophy

Hisaab is designed to feel like:

> A modern digital milk notebook.

### UI Goals

- Minimal
- Peaceful
- Spacious
- Fast
- Familiar

---

# 📂 Project Structure

```bash
src/
 ├── app/
 ├── modules/
 ├── shared/
 ├── database/
 ├── localization/
 ├── utils/
 └── assets/
```

---

# ⚡ Current Status

## ✅ Completed

- Home Screen
- Daily Register
- Monthly History
- Edit Records
- Pricing Presets
- Localization
- PDF Invoice Export
- Android Preview Builds
- Tablet Support
- Offline Storage

---

# 🔮 Planned Features

- WhatsApp invoice sharing
- Cloud backup
- Multiple milk books
- Analytics
- Unit system selection
- Custom quantity presets

---

# 📸 Branding

### Theme Colors

| Color       | Hex       |
| ----------- | --------- |
| Primary Red | `#e7000b` |
| Black       | `#000000` |
| White       | `#ffffff` |

---

# 🛠️ Installation

```bash
git clone <repo-url>

cd hisaab

npm install

npx expo start
```

---

# 📦 Build APK

```bash
eas build --platform android --profile preview
```

---

# ❤️ Philosophy

Hisaab is built to replace paper milk notebooks with a simple, modern, and reliable digital experience.

Fast. Offline. Familiar.

---

# 👨‍💻 Developer

Made with ❤️ using React Native + Expo
