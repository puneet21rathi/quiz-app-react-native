import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const ResultScreen = ({ route, navigation }) => {
  const { score, total } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Completed!</Text>
      <Text style={styles.result}>Your Score: {score} / {total}</Text>
      <Button title="Go to Home" onPress={() => navigation.replace("HomeScreen")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  result: { fontSize: 18, marginBottom: 10 },
});

export default ResultScreen;
