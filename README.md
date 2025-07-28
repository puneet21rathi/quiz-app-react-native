🚀 Features

🧠 Multiple Choice Questions with Extra Details (badges, time estimates)

✅ Instant Answer Validation with visual feedback

📊 Score Calculation with Feedback Rings & Emoji Ratings

🔁 Replay Quiz Option from Results Screen

⏱️ Countdown Timer with Auto-submit (for each question)

🏷️ Difficulty Badge: Easy | Medium | Hard :- This is based on your correct solution and there will be different motivational Badge on each day!

🔥 Daily Streak Display (track your consistency)

🎯 Quiz of the Day Banner with direct start

💬 Tip / Fun Fact / Quote of the Day section

📅 Today’s Date display

📤 Share Your Score Button with additional facilities

⚠️ Exit Confirmation Alert

👋 Splash Screen (2s animated entry)

🧭 Onboarding Slider (only for first-time users)

⌛ Loading Spinner on quiz navigation

📱 Optimized for Android (iOS-compatible with tweaks)

🛠️ Technology Stack

React Native (Expo/CLI)

JavaScript / JSX

React Navigation (Stack)

AsyncStorage (onboarding tracking)

Custom Reusable Components: OptionButton, QuizCard

SafeAreaView, FlatList, Modal, and more native features

🔧 Installation & Running Locally

Clone the Repository

git clone https://github.com/puneet21rathi/quiz-app-react-native.git
cd quiz-app-react-native

Install Dependencies

npm install

Also install AsyncStorage for onboarding:

npm install @react-native-async-storage/async-storage

Start Metro Bundler

npm start

Run on Android Device / Emulator

npm run android

📦 To fix Android build hanging at 99%, run this if needed:

cd android
./gradlew clean

📂 Project Structure

src/
├── components/
│ ├── OptionButton.js // Answer button with color feedback
│ └── QuizCard.js // Quiz tile with icons, badges
├── screens/
│ ├── SplashScreen.js // Shown for 2s on launch
│ ├── OnboardingScreen.js // Only shows once on first install
│ ├── HomeScreen.js // Main screen with all banners
│ ├── QuizScreen.js // Handles questions, timer, validation
│ └── ResultScreen.js // Summary + Share + Replay

