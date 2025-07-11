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
{/* 🔙 Back Button */}
<Button
title="🔙 Back to Categories"
onPress={() => navigation.replace("CategoryScreen")}
color="#007bff"
/>

  <Text style={styles.appTitle}>📚 Brain Boost Quiz</Text>
  <Text style={styles.welcomeText}>👋 Welcome back, Genius!</Text>
  <Text style={styles.streakText}>🔥 Streak: 3 days in a row</Text>

  {/* 🎉 Motivational Banner */}
  <View style={styles.motivationBanner}>
    <Text style={styles.motivationText}>
      🎉 Keep Going! Every quiz makes you smarter.
    </Text>
  </View>

  {/* ℹ️ Instructions Button */}
  <TouchableOpacity onPress={() => setModalVisible(true)}>
    <Text style={styles.infoButton}>ℹ️ Instructions</Text>
  </TouchableOpacity>

  {/* 🧠 Quote of the Day */}
  <View style={styles.quoteBox}>
    <Text style={styles.quoteIcon}>🧠</Text>
    <Text style={styles.quoteText}>
      "Learning never exhausts the mind — it only strengthens it."
    </Text>
  </View>

  {/* 💡 Tip of the Day */}
  <View style={styles.tipBox}>
    <Text style={styles.tipTitle}>💡 Tip of the Day</Text>
    <Text style={styles.tipText}>
      Attempt quizzes regularly to build confidence and speed.
    </Text>
  </View>

  {/* 🤓 Fun Fact of the Day */}
  <View style={styles.factBox}>
    <Text style={styles.factTitle}>🤓 Fun Fact</Text>
    <Text style={styles.factText}>
      Did you know? The Eiffel Tower can grow over 6 inches during hot days due to thermal expansion!
    </Text>
  </View>

  {/* 🎯 Quiz of the Day */}
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

  {/* 📌 Modal */}
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

        <Pressable
          style={styles.closeButton}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
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
quoteIcon: {
fontSize: 24,
marginBottom: 4,
},
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
tipTitle: {
fontSize: 18,
fontWeight: "bold",
marginBottom: 4,
color: "#e67e22",
},
tipText: {
fontSize: 15,
color: "#444",
},
factBox: {
backgroundColor: "#e3fcef",
borderLeftWidth: 4,
borderLeftColor: "#28a745",
padding: 12,
borderRadius: 6,
marginBottom: 15,
},
factTitle: {
fontSize: 18,
fontWeight: "bold",
marginBottom: 4,
color: "#28a745",
},
factText: {
fontSize: 15,
color: "#333",
},
banner: {
backgroundColor: "#fcebd8",
padding: 16,
borderRadius: 10,
marginBottom: 20,
alignItems: "center",
},
bannerTitle: {
fontSize: 20,
fontWeight: "bold",
color: "#d35400",
},
bannerSubtitle: {
fontSize: 14,
color: "#555",
marginVertical: 4,
},
startButton: {
backgroundColor: "#e67e22",
paddingHorizontal: 20,
paddingVertical: 8,
borderRadius: 6,
marginTop: 8,
},
startButtonText: {
color: "#fff",
fontWeight: "bold",
fontSize: 16,
},
sectionTitle: {
fontSize: 22,
fontWeight: "600",
textAlign: "center",
marginBottom: 10,
color: "#333",
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
