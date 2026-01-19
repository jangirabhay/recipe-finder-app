🍳 Recipe Finder App

The Recipe Finder App is a cross-platform React Native mobile application that helps users discover delicious recipes to cook at home. Users can search recipes, save favorites, and explore different categories — all within a modern and easy-to-use interface.

This project was bootstrapped using @react-native-community/cli.

🚀 Features

Recipe Search
Search recipes using keywords or ingredients.

Favorites
Save your favorite recipes locally for quick access.

Offline Storage
Uses Redux + AsyncStorage to persist favorite recipes and app state.

Smooth Navigation
Seamless screen transitions using React Navigation.

Image Support
Beautifully displays recipe images.

Modern UI
Clean, responsive, and mobile-friendly design.

Cross-Platform
Works on both Android and iOS devices.

✨ Optional / Future Enhancements

Filter recipes by:

Cuisine type

Dietary preferences (Veg, Vegan, Keto, etc.)

Sort recipes by:

Popularity

Difficulty

Cooking time

Dark / Light mode toggle

User authentication and cloud sync

🧭 Screens & Navigation

The app includes the following screens:

Home Screen
Browse trending and latest recipes.

Search Screen
Search recipes by name or ingredient.

Recipe Details Screen
View complete recipe information including:

Ingredients

Cooking instructions

Recipe image

Favorites Screen
Quick access to saved recipes.

Settings Screen
Manage app preferences and theme options.

Navigation is handled using React Navigation, and global state is managed with Redux.

🏁 Getting Started

Make sure you have completed the React Native environment setup before running the project.

Step 1: Install Dependencies
npm install


Step 2: Start Metro Bundler
npm start


Step 3: Run the App
📱 Android
npm run android


🍎 iOS

First time only:

bundle install
bundle exec pod install


Then run:

npm run ios


Step 4: Modify the App

Open App.tsx or files inside the screens folder to start customizing the app.
Changes will automatically reflect on the device using Fast Refresh.

🔧 Libraries & Tools Used

React Native – Core framework

React Navigation – Screen navigation

Redux + Redux Toolkit – Global state management

AsyncStorage – Persistent local storage

Axios / Fetch API – API requests

React Native Vector Icons – Icons for UI

React Native Paper / UI Kitten (Optional) – UI components

CocoaPods – iOS dependency management

📱 Screenshots

Add screenshots here to showcase your app UI.

🛠️ Troubleshooting

If you encounter issues, try the following:

Reinstall Dependencies
rm -rf node_modules
npm install

Reset Metro Cache
npm start -- --reset-cache

Clean Android Build
cd android
./gradlew clean

📚 Learn More

React Native Documentation

Redux Documentation

React Navigation Documentation

🧾 Optional Commands
View Android Debug Keystore Info
keytool -keystore ./android/app/debug.keystore -list -v

✅ Summary

This Recipe Finder App demonstrates:

Practical use of React Native

State management with Redux

Persistent storage using AsyncStorage

Clean UI and smooth navigation

It is a great project for learning mobile app development and building real-world React Native applications.
