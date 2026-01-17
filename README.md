#Recipe Finder App 🍳

This is a React Native mobile application that allows you to find recipes to cook at home.
You can search, save favorites, and explore recipes from various categories — all in one app.

This project was bootstrapped using @react-native-community/cli
.

Features 🚀

Recipe Search: Find recipes using keywords or ingredients.

Favorites: Save your favorite recipes locally.

Offline Storage: Uses Redux + AsyncStorage to store favorite recipes and app state.

Navigation: Smooth React Navigation between screens.

Image Support: Display recipe images beautifully.

Modern UI: Clean, mobile-friendly interface.

Cross-platform: Works on both iOS and Android.

Optional Extra Features:

Filters by cuisine or dietary preferences

Sorting recipes by popularity, difficulty, or time

Dark/Light mode toggle

Screens / Navigation 🧭

Home Screen: Browse latest and trending recipes.

Search Screen: Search recipes by name or ingredient.

Recipe Details: View full recipe with instructions, ingredients, and image.

Favorites: Quick access to saved recipes.

Settings: Manage app preferences and theme.

Navigation handled with React Navigation and state management via Redux.

Getting Started 🏁

Make sure you have completed the React Native environment setup
.

Step 1: Install Dependencies
npm install
# or
yarn install

Step 2: Start Metro
npm start
# or
yarn start

Step 3: Run the App
Android
npm run android
# or
yarn android

iOS
bundle install        # first time only
bundle exec pod install
npm run ios
# or
yarn ios

Step 4: Modify the App

Open App.tsx (or your screens folder) and start customizing.
Changes will automatically refresh on your device via Fast Refresh.

Libraries & Tools Used 🔧

React Native – Core framework

React Navigation – For screen navigation

Redux + Redux Toolkit – Global state management

AsyncStorage – Persistent local storage

Axios / Fetch – API requests

React Native Vector Icons – Icons in UI

React Native Paper / UI Kitten (Optional) – Modern UI components

CocoaPods – For iOS dependencies

Screenshots 📱

Add some screenshots here to show your app visually.

Troubleshooting 🛠️

If you encounter errors:

Clear node_modules and reinstall:

rm -rf node_modules
npm install


Reset Metro cache:

npm start -- --reset-cache


Android build clean:

cd android
./gradlew clean

Learn More 📚

React Native Docs

Redux Docs

React Navigation Docs

Optional Commands 🧾

List debug keystore info:

keytool -keystore ./android/app/debug.keystore -list -v


✅ This README now clearly communicates:

What the app is (Recipe Finder)

Features & tech used (navigation, Redux, AsyncStorage, modern UI)

How to run and develop
