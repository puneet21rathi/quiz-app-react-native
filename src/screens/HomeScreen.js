import React from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  Platform,
} from "react-native";
import QuizCard from "../components/QuizCard";

const quizzes = [
  { id: "1", title: "Science Quiz" },
  { id: "2", title: "Maths Quiz" },
];

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select a Quiz</Text>
      <FlatList
        contentContainerStyle={styles.listContainer}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
    textAlign: "center",
  },
});

export default HomeScreen;
