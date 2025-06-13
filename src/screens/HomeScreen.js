import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import QuizCard from "../components/QuizCard";

const quizzes = [
  { id: "1", title: "Science Quiz" },
  { id: "2", title: "Maths Quiz" },
];

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>📚 Brain Boost Quiz</Text>

      {/* ℹ️ Instructions Button */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.infoButton}>ℹ️ Instructions</Text>
      </TouchableOpacity>

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
  infoButton: {
    fontSize: 16,
    color: "#007bff",
    textAlign: "center",
    marginBottom: 15,
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