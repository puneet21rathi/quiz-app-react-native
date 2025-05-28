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
      <Text style={styles.title}>Select a Quiz</Text>
      <FlatList
        data={quizzes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <QuizCard title={item.title} onPress={() => navigation.replace("QuizScreen", { quizId: item.id })} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
});

export default HomeScreen;
