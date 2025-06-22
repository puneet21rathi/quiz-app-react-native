import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import QuizScreen from "./src/screens/QuizScreen";
import ResultScreen from "./src/screens/ResultScreen";
import SplashScreen from "./src/screens/SplashScreen";
import OnboardingScreen from "./src/screens/OnboardingScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
  <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SplashScreen" component={SplashScreen} />
    <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="QuizScreen" component={QuizScreen} options={{ gestureEnabled: false }} />
    <Stack.Screen name="ResultScreen" component={ResultScreen} options={{ gestureEnabled: false }} />
  </Stack.Navigator>
</NavigationContainer>

  );
};

export default App;
