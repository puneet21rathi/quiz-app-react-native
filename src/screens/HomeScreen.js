import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import QuizCard from "../components/QuizCard";

const quizzes = [
  { id: "1", title: "Science Quiz" },
  { id: "2", title: "Maths Quiz" },
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* 🔥 App Title */}
      <Text style={styles.appTitle}>📚 Brain Boost Quiz</Text>

      {/* Quiz Section */}
      <Text style={styles.sectionTitle}>Select a Quiz</Text>

      <FlatList
        data={quizzes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <QuizCard
            title={item.title}
            onPress={() =>
              navigation.replace("QuizScreen", { quizId: item.id })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2c3e50",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
});

export default HomeScreen;