import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem("hasLaunched");

      setTimeout(() => {
        if (hasLaunched === null) {
          AsyncStorage.setItem("hasLaunched", "true");
          navigation.replace("OnboardingScreen");
        } else {
          navigation.replace("HomeScreen");
        }
        setLoading(false);
      }, 2000);
    };

    checkFirstLaunch();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Quiz Game</Text>
      {loading && <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#007bff",
  },
});

export default SplashScreen;
