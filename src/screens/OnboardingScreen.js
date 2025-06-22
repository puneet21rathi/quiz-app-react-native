import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native";

const { width } = Dimensions.get("window");

const slides = [
  {
    title: "🎯 Attempt Quizzes",
    description: "Choose from multiple categories and test your knowledge.",
    backgroundColor: "#007bff",
  },
  {
    title: "📊 Track Your Score",
    description: "Get instant feedback and see your performance.",
    backgroundColor: "#28a745",
  },
  {
    title: "📤 Share with Friends",
    description: "Challenge your friends and share your results easily.",
    backgroundColor: "#ffc107",
  },
];

const OnboardingScreen = ({ navigation }) => {
  return (
    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
      {slides.map((item, index) => (
        <View key={index} style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>

          {index === slides.length - 1 && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.replace("HomeScreen")}
            >
              <Text style={styles.buttonText}>Get Started →</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  slide: {
    width,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  buttonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OnboardingScreen;
