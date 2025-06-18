import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  SafeAreaView,
  Share,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native";

const ResultScreen = ({ route, navigation }) => {
  const { score, total, quizId, quizTitle } = route.params;
  const percentage = Math.round((score / total) * 100);

  // ✅ Show toast/alert on load
  useEffect(() => {
    const message = "Quiz Completed Successfully 🎉";
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert("Success", message);
    }
  }, []);

  const getEmoji = () => {
    if (percentage === 100) return "🏆";
    if (percentage >= 80) return "🥳";
    if (percentage >= 50) return "😎";
    return "🤔";
  };

  const getMessage = () => {
    if (percentage === 100) return "Perfect Score! You're a genius!";
    if (percentage >= 80) return "Great job! You really know your stuff.";
    if (percentage >= 50) return "Good effort! Keep practicing.";
    return "Don’t worry! Try again and you'll get better!";
  };

  const getMessageColor = () => {
    if (percentage === 100) return "#28a745";
    if (percentage >= 80) return "#17a2b8";
    if (percentage >= 50) return "#ffc107";
    return "#dc3545";
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I scored ${score} out of ${total} in ${quizTitle}! 🎯 Can you beat my score? #QuizApp`,
      });
    } catch (error) {
      alert("Error sharing score.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {/* ✅ Quiz Title */}
        <Text style={styles.quizName}>✅ {quizTitle} Completed</Text>

        {/* 🎯 Score Ring */}
        <View style={styles.ringContainer}>
          <View
            style={[
              styles.outerRing,
              { borderColor: getMessageColor() },
            ]}
          >
            <Text style={styles.percentText}>{percentage}%</Text>
            <Text style={styles.emoji}>{getEmoji()}</Text>
          </View>
        </View>

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
                quizTitle,
              })
            }
          />
          <View style={{ marginTop: 10 }} />
          <Button
            title="🏠 Go to Home"
            onPress={() => navigation.replace("HomeScreen")}
          />
        </View>

        {/* 📤 Share Button */}
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareButtonText}>📤 Share Your Score</Text>
        </TouchableOpacity>
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
  quizName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 8,
    textAlign: "center",
  },
  ringContainer: {
    marginBottom: 20,
  },
  outerRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fefefe",
  },
  percentText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  emoji: {
    fontSize: 32,
    marginTop: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
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
  shareButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  shareButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ResultScreen;
