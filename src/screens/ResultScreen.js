import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  SafeAreaView,
  Animated,
} from "react-native";

const ResultScreen = ({ route, navigation }) => {
  const { score, total, quizId } = route.params;

  // Animation for 🎉
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, []);

  const getMessage = () => {
    const percentage = (score / total) * 100;
    if (percentage === 100) return "🏆 Perfect Score! You’re a genius!";
    if (percentage >= 80) return "🎉 Great job! You really know your stuff.";
    if (percentage >= 50) return "👍 Good effort! Keep practicing.";
    return "😅 Don’t worry! Try again and you’ll get better!";
  };

  const getMessageColor = () => {
    const percentage = (score / total) * 100;
    if (percentage === 100) return "#28a745";
    if (percentage >= 80) return "#17a2b8";
    if (percentage >= 50) return "#ffc107";
    return "#dc3545";
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {/* 🎉 Animated Emoji */}
        <Animated.Text
          style={[
            styles.emoji,
            {
              transform: [{ scale: scaleAnim }],
              opacity: scaleAnim,
            },
          ]}
        >
          🎉
        </Animated.Text>

        <Text style={styles.title}>🎯 Quiz Completed!</Text>

        <Text style={styles.scoreText}>
          You scored: <Text style={styles.scoreHighlight}>{score}</Text> / {total}
        </Text>

        <Text style={[styles.message, { color: getMessageColor() }]}>
          {getMessage()}
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            title="🔁 Restart Quiz"
            onPress={() =>
              navigation.replace("QuizScreen", {
                quizId,
              })
            }
          />
          <View style={{ marginTop: 10 }} />
          <Button
            title="🏠 Go to Home"
            onPress={() => navigation.replace("HomeScreen")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  card: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    width: "85%",
    alignItems: "center",
  },
  emoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  scoreText: {
    fontSize: 20,
    marginBottom: 10,
    color: "#444",
  },
  scoreHighlight: {
    fontWeight: "bold",
    color: "#007bff",
  },
  message: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 25,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
  },
});

export default ResultScreen;