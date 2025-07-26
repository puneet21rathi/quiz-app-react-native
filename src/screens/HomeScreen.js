import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Button,
  ActivityIndicator,
} from "react-native";
import QuizCard from "../components/QuizCard";
const today = new Date().toDateString(); // 📅 Today's Date

const colors = [
  { name: "Sky Blue", hex: "#87ceeb" },
  { name: "Coral", hex: "#ff7f50" },
  { name: "Lime Green", hex: "#32cd32" },
  { name: "Peach", hex: "#ffe5b4" },
  { name: "Lavender", hex: "#e6e6fa" },
  { name: "Mint", hex: "#98ff98" },
];
const colorOfTheDay = colors[new Date().getDate() % colors.length];

const quizzes = [
  {
    id: "1",
    title: "Science Quiz",
    totalQuestions: 5,
    isPopular: false,
    difficulty: "medium",
    estimatedTime: 3,
    new: false,
  },
  {
    id: "2",
    title: "Maths Quiz",
    totalQuestions: 5,
    isPopular: true,
    difficulty: "hard",
    estimatedTime: 4,
    new: true,
  },
];

// ✅ 25 July: Total Questions Count
const totalQuestions = quizzes.reduce((sum, q) => sum + q.totalQuestions, 0);

// ✅ 26 July: Dummy Daily Goal Progress
const GOAL_QUIZZES = 2;
const ATTEMPTED_TODAY = 1; // <- change later via state/AsyncStorage
const progressPct = Math.min((ATTEMPTED_TODAY / GOAL_QUIZZES) * 100, 100);

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartQuiz = (item) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.replace("QuizScreen", {
        quizId: item.id,
        quizTitle: item.title,
      });
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <Button
        title="🔙 Back to Categories"
        onPress={() => navigation.replace("CategoryScreen")}
        color="#007bff"
      />

      {/* 🎓 Header Banner */}
      <View style={styles.headerBanner}>
        <Text style={styles.headerText}>🎓 Welcome to Quiz Master!</Text>
      </View>

      {/* 📅 Date */}
      <View style={styles.dateBox}>
        <Text style={styles.dateText}>📅 Today: {today}</Text>
      </View>

      {/* 📊 Stats Strip */}
      <View style={styles.statsStrip}>
        <Text style={styles.statsText}>📋 Quizzes: {quizzes.length}</Text>
        <Text style={styles.separator}>|</Text>
        <Text style={styles.statsText}>❓ Questions: {totalQuestions}</Text>
      </View>

      {/* 📢 Message of the Day */}
      <View style={styles.messageBanner}>
        <Text style={styles.messageTitle}>📢 Message of the Day</Text>
        <Text style={styles.messageText}>
          “Small progress each day adds up to big results.” 💪
        </Text>
      </View>

      <Text style={styles.appTitle}>📚 Brain Boost Quiz</Text>
      <Text style={styles.welcomeText}>👋 Welcome back, Genius!</Text>
      <Text style={styles.streakText}>🔥 Streak: 3 days in a row</Text>

      {/* 📌 Daily Goal Banner */}
      <View style={styles.dailyGoalBox}>
        <Text style={styles.dailyGoalTitle}>📌 Daily Goal</Text>
        <Text style={styles.dailyGoalText}>
          Complete {GOAL_QUIZZES} quizzes today to stay on your streak!
        </Text>

        {/* ✅ 26 July: Progress Bar */}
        <View style={styles.progressWrapper}>
          <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progressPct}%` }]} />
          </View>
          <Text style={styles.progressLabel}>
            {ATTEMPTED_TODAY}/{GOAL_QUIZZES} completed
          </Text>
        </View>
      </View>

      {/* 🎨 Color of the Day */}
      <View style={styles.colorBox}>
        <Text style={styles.colorTitle}>🎨 Color of the Day</Text>
        <View style={[styles.colorSwatch, { backgroundColor: colorOfTheDay.hex }]} />
        <Text style={styles.colorName}>{colorOfTheDay.name}</Text>
      </View>

      {/* 🎉 Motivation */}
      <View style={styles.motivationBanner}>
        <Text style={styles.motivationText}>
          🎉 Keep Going! Every quiz makes you smarter.
        </Text>
      </View>

      {/* 🏅 Achievement */}
      <View style={styles.achievementBanner}>
        <Text style={styles.achievementText}>
          🏅 Daily Achievement Unlocked: You attempted 1 quiz today!
        </Text>
      </View>

      {/* (Old goal banner - keeping as secondary) */}
      <View style={styles.goalBanner}>
        <Text style={styles.goalTitle}>📌 Daily Goal</Text>
        <Text style={styles.goalText}>
          You’ve set a goal to complete 2 quizzes today. Let’s do it! 💥
        </Text>
      </View>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.infoButton}>ℹ️ Instructions</Text>
      </TouchableOpacity>

      <View style={styles.quoteBox}>
        <Text style={styles.quoteIcon}>🧠</Text>
        <Text style={styles.quoteText}>
          "Learning never exhausts the mind — it only strengthens it."
        </Text>
      </View>

      <View style={styles.tipBox}>
        <Text style={styles.tipTitle}>💡 Tip of the Day</Text>
        <Text style={styles.tipText}>
          Attempt quizzes regularly to build confidence and speed.
        </Text>
      </View>

      <View style={styles.factBox}>
        <Text style={styles.factTitle}>🤓 Fun Fact</Text>
        <Text style={styles.factText}>
          Did you know? The Eiffel Tower can grow over 6 inches during hot days due to thermal expansion!
        </Text>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>🎯 Quiz of the Day</Text>
        <Text style={styles.bannerSubtitle}>Don't miss today's challenge!</Text>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() =>
            handleStartQuiz({
              id: "2",
              title: "Maths Quiz",
            })
          }
        >
          <Text style={styles.startButtonText}>▶️ Start Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.triviaBox}>
        <Text style={styles.triviaTitle}>💬 Did You Know?</Text>
        <Text style={styles.triviaText}>
          Honey never spoils. Archaeologists have found pots of honey in ancient tombs that are over 3000 years old and still perfectly edible!
        </Text>
      </View>

      {/* 🌟 Featured Quiz Section */}
      <View style={styles.featuredQuizBox}>
        <Text style={styles.featuredTitle}>🌟 Featured Quiz</Text>
        <Text style={styles.featuredSubtitle}>Challenge your brain with today’s highlight!</Text>
        <Text style={styles.featuredQuizName}>🧪 Science Quiz</Text>
        <TouchableOpacity
          style={styles.featuredStartButton}
          onPress={() =>
            handleStartQuiz({
              id: "1",
              title: "Science Quiz",
            })
          }
        >
          <Text style={styles.featuredStartText}>Start Quiz ➡️</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Select a Quiz</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={quizzes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <QuizCard
              title={item.title}
              totalQuestions={item.totalQuestions}
              isPopular={item.isPopular}
              difficulty={item.difficulty}
              estimatedTime={item.estimatedTime}
              isNew={item.new}
              onPress={() => handleStartQuiz(item)}
            />
          )}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>📝 Quiz Instructions</Text>
            <Text style={styles.modalText}>• Each quiz contains 5 questions.</Text>
            <Text style={styles.modalText}>• You have 15 seconds per question.</Text>
            <Text style={styles.modalText}>• Select the correct option and click 'Check Answer'.</Text>
            <Text style={styles.modalText}>• You can restart or return home after finishing.</Text>
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// ---------------------  STYLES  ---------------------
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40, backgroundColor: "#fff" },

  // ✅ 26 July: Progress Bar
  progressWrapper: {
    marginTop: 10,
  },
  progressBarBg: {
    height: 10,
    backgroundColor: "#e9ecef",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressBarFill: {
    height: 10,
    backgroundColor: "#28a745",
    borderRadius: 6,
  },
  progressLabel: {
    marginTop: 6,
    fontSize: 13,
    color: "#495057",
    fontWeight: "500",
  },

  statsStrip: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eef2ff",
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 15,
  },
  statsText: { fontSize: 15, fontWeight: "600", color: "#374151", paddingHorizontal: 6 },
  separator: { color: "#6b7280", fontSize: 16, paddingHorizontal: 4 },

  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#2c3e50",
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#4b0082",
    marginBottom: 6,
  },
  streakText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: "#d35400",
    marginBottom: 12,
  },
  headerBanner: {
    backgroundColor: "#dbeafe",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    borderLeftWidth: 5,
    borderLeftColor: "#6366f1",
    elevation: 2,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e3a8a",
  },
  dateBox: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#007bff",
  },
  messageBanner: {
    backgroundColor: "#fff4e6",
    borderLeftWidth: 4,
    borderLeftColor: "#f39c12",
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
  },
  goalBanner: {
    backgroundColor: "#e8f9f1",
    borderLeftWidth: 4,
    borderLeftColor: "#20c997",
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
  },
  dailyGoalBox: {
    backgroundColor: "#fff3cd",
    borderLeftWidth: 4,
    borderLeftColor: "#ffc107",
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
  },
  dailyGoalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#856404",
    marginBottom: 4,
  },
  dailyGoalText: {
    fontSize: 15,
    color: "#6c757d",
  },
  goalTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#0d8f70",
    marginBottom: 4,
  },
  goalText: {
    fontSize: 15,
    color: "#444",
    lineHeight: 20,
  },
  messageTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#d35400",
    marginBottom: 4,
  },
  messageText: {
    fontSize: 15,
    color: "#444",
    lineHeight: 20,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  colorBox: {
    backgroundColor: "#f0f8ff",
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#7b68ee",
    borderRadius: 6,
    marginBottom: 15,
    alignItems: "center",
  },
  colorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7b68ee",
  },
  colorSwatch: {
    width: 80,
    height: 30,
    marginVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  colorName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  motivationBanner: {
    backgroundColor: "#eafaf1",
    borderLeftWidth: 4,
    borderLeftColor: "#2ecc71",
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
    alignItems: "center",
  },
  motivationText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    textAlign: "center",
  },
  achievementBanner: {
    backgroundColor: "#fff0e6",
    borderLeftWidth: 4,
    borderLeftColor: "#ff851b",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
    alignItems: "center",
  },
  achievementText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#bf360c",
    textAlign: "center",
  },
  infoButton: {
    fontSize: 16,
    color: "#007bff",
    textAlign: "center",
    marginBottom: 15,
  },
  quoteBox: {
    backgroundColor: "#e6f0ff",
    borderLeftWidth: 4,
    borderLeftColor: "#007bff",
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
  },
  quoteIcon: { fontSize: 24, marginBottom: 4 },
  quoteText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#333",
  },
  tipBox: {
    backgroundColor: "#fff8e1",
    borderLeftWidth: 4,
    borderLeftColor: "#ffb300",
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
  },
  tipTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 4, color: "#e67e22" },
  tipText: { fontSize: 15, color: "#444" },
  factBox: {
    backgroundColor: "#e3fcef",
    borderLeftWidth: 4,
    borderLeftColor: "#28a745",
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
  },
  factTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 4, color: "#28a745" },
  factText: { fontSize: 15, color: "#333" },
  banner: {
    backgroundColor: "#fcebd8",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  bannerTitle: { fontSize: 20, fontWeight: "bold", color: "#d35400" },
  bannerSubtitle: { fontSize: 14, color: "#555", marginVertical: 4 },
  startButton: {
    backgroundColor: "#e67e22",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 8,
  },
  startButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  triviaBox: {
    backgroundColor: "#f0f8ff",
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#1e90ff",
    borderRadius: 6,
    marginBottom: 15,
  },
  triviaTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e90ff",
    marginBottom: 6,
  },
  triviaText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 25,
    width: "85%",
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#444",
    textAlign: "left",
    width: "100%",
  },
  featuredQuizBox: {
    backgroundColor: "#f0fff0",
    borderLeftWidth: 4,
    borderLeftColor: "#32cd32",
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#228b22",
  },
  featuredSubtitle: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
  featuredQuizName: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 8,
    color: "#006400",
  },
  featuredStartButton: {
    backgroundColor: "#32cd32",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  featuredStartText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HomeScreen;
