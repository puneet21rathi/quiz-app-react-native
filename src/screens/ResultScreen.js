import React from "react";
import {
  SafeAreaView,
  Text,
  Button,
  StyleSheet,
  Platform,
} from "react-native";

const ResultScreen = ({ route, navigation }) => {
  const { score, total } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Quiz Completed!</Text>
      <Text style={styles.result}>
        Your Score: {score} / {total}
      </Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.replace("HomeScreen")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 30 : 0,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  result: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ResultScreen;
