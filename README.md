# 📱 Quiz Game App (React Native)

A fun and interactive mobile quiz application built using React Native. Designed to test your knowledge, track your score, and engage with clean UI animations and onboarding slides.

---

## 🚀 Features

- 🧠 Multiple Choice Questions
- ✅ Instant Answer Validation
- 📊 Score Calculation with Visual Feedback
- 🔁 Replay Quiz Option
- ⏱️ Countdown Timer with Progress Bar
- 🏷️ Difficulty Badge (Easy, Medium, Hard)
- ⚠️ Exit Confirmation Alert
- 👋 Splash Screen (2s loader)
- 🧭 Onboarding Slider for First-Time Users
- 📱 Optimized for Android (iOS compatible with minor tweaks)

---

## 🛠️ Technology Stack

- React Native, Node.js
- JavaScript / JSX
- React Navigation (Stack)
- AsyncStorage (for onboarding tracking)
- Custom Components (OptionButton, QuizCard)

---

## 📸 Screenshots (optional)

You can include screenshots here:

- Home Screen
- Quiz Screen with timer and difficulty
- Result Screen
- Onboarding Slides
- Splash Screen

---

## 🔧 Installation & Running Locally

### 1. Clone the Repository


git clone https://github.com/puneet21rathi/quiz-app-react-native.git
cd quiz-app-react-native


2. Install Dependencies:- npm install

   (Also install AsyncStorage for onboarding)

   npm install @react-native-async-storage/async-storage


3. Run Metro Bundler

   npm start

4. Run the App on Android
 
   npm run android


📂 Project Structure

src/
├── components/
│   ├── OptionButton.js
│   └── QuizCard.js
├── screens/
│   ├── SplashScreen.js       // NEW
│   ├── OnboardingScreen.js   // NEW
│   ├── HomeScreen.js
│   ├── QuizScreen.js
│   └── ResultScreen.js



