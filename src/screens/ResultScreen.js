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
  const { score, total, quizId, quizTitle, startTime, endTime } = route.params;

  const percentage = Math.round((score / total) * 100);
  const accuracy = ((score / total) * 100).toFixed(2);

  const totalTimeSec = Math.floor((endTime - startTime) / 1000);
  const minutes = Math.floor(totalTimeSec / 60);
  const seconds = totalTimeSec % 60;

  useEffect(() => {
    const message = "Quiz Completed Successfully 🎉";
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert("Success", message);
    }
  }, []);

  const getBadge = () => {
    if (percentage === 100) return { emoji: "🥇", label: "Gold", color: "#FFD700" };
    if (percentage >= 80) return { emoji: "🥈", label: "Silver", color: "#C0C0C0" };
    if (percentage >= 50) return { emoji: "🥉", label: "Bronze", color: "#cd7f32" };
    return { emoji: "🚫", label: "Try Again", color: "#dc3545" };
  };

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
    const badge = getBadge();
    try {
      await Share.share({
        message: `I scored ${score} / ${total} in ${quizTitle}! 🧠\nBadge: ${badge.emoji} ${badge.label}\n#QuizApp`,
      });
    } catch (error) {
      alert("Error sharing score.");
    }
  };

  const handleRestart = () => {
    Alert.alert(
      "Restart Quiz",
      "Are you sure you want to restart this quiz?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: () =>
            navigation.replace("QuizScreen", {
              quizId,
              quizTitle,
            }),
        },
      ]
    );
  };

  const badge = getBadge();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.quizName}>✅ {quizTitle} Completed</Text>

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

        <Text style={styles.statText}>⏱️ Time Taken: {minutes}m {seconds}s</Text>
        <Text style={styles.statText}>📊 Accuracy: {accuracy}%</Text>

        {/* 🏅 Completion Badge */}
        <View style={[styles.badgeBox, { borderColor: badge.color }]}>
          <Text style={[styles.badgeText, { color: badge.color }]}>
            {badge.emoji} {badge.label} Badge
          </Text>
        </View>

        <Text style={[styles.message, { color: getMessageColor() }]}>
          {getMessage()}
        </Text>

        <View style={styles.buttonContainer}>
          <Button title="🔁 Restart Quiz" onPress={handleRestart} />
          <View style={{ marginTop: 10 }} />
          <Button title="🏠 Go to Home" onPress={() => navigation.replace("HomeScreen")} />
        </View>

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
  statText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  badgeBox: {
    borderWidth: 2,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 12,
  },
  badgeText: {
    fontSize: 16,
    fontWeight: "bold",
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
