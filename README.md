# 🍽️ My Recipe App

Welcome to **My Recipe App** — a mobile application built with **React Native** , **TypeScript** and **Expo** that helps you explore your favorite food recipes.

## Tech Stack

- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Expo](https://expo.dev/)

## Offline Support

My Recipe App caches recipes locally using `AsyncStorage`. If you're offline, the app will display the most recently fetched recipes from cache.

- Caching with: AsyncStorage
- Source API: [TheMealDB](https://www.themealdb.com/api.php)

## Getting Started (iPhone / Expo Go)

You can directly [visit here](https://snack.expo.dev/@rakib17/my-recipe-app) to enjoy the live application.

OR

Follow these steps to get the app running on your iPhone using **Expo Go**:

### 1. Clone the Repository

```bash
git clone https://github.com/omiq17/myRecipeApp.git
cd myRecipeApp
```

### 2. Install Dependencies

```bash
npm install
```

> Make sure you have **Node.js** installed. You can install it via [Homebrew](https://brew.sh):
>
> ```bash
> brew install node
> ```

### 3. Install Expo CLI (if not already installed)

```bash
npm install -g expo-cli
```

### 4. Start the Development Server

```bash
npx expo start
```

> This will open Expo DevTools in your browser and display a QR code in your terminal.

### 5. Open App on iPhone

1. Install the **Expo Go app** from the App Store on your iPhone.
2. Open **Expo Go**, and scan the QR code shown in your terminal or browser.
3. The app will open on your phone.

## High Level Architecture Diagram

<img src="assets/hlad.png" alt="Data Flow Diagram"/>

## Data Flow Diagram

<img src="assets/data-flow.png" alt="Data Flow Diagram"/>


Developed by [@omiq17](https://github.com/omiq17)
