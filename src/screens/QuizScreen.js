import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  Platform,
  View,
} from "react-native";
import OptionButton from "../components/OptionButton";

const quizzes = {
  "1": [
    { question: "What is H2O?", options: ["Oxygen", "Water", "Hydrogen", "Carbon"], correct: 1 },
    { question: "What is the sun?", options: ["Planet", "Star", "Asteroid", "Comet"], correct: 1 },
    { question: "Which gas do plants absorb?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct: 1 },
    { question: "Earth's largest ocean?", options: ["Atlantic", "Pacific", "Indian", "Arctic"], correct: 1 },
    { question: "Which organ pumps blood?", options: ["Liver", "Heart", "Brain", "Lungs"], correct: 1 },
  ],
  "2": [
    { question: "2 + 2 =", options: ["3", "4", "5", "6"], correct: 1 },
    { question: "5 x 3 =", options: ["10", "15", "20", "25"], correct: 1 },
    { question: "Square root of 16?", options: ["2", "4", "8", "16"], correct: 1 },
    { question: "10 / 2 =", options: ["2", "5", "8", "10"], correct: 1 },
    { question: "20 - 5 =", options: ["10", "15", "20", "25"], correct: 1 },
  ],
};

const QuizScreen = ({ route, navigation }) => {
  const { quizId } = route.params;
  const questions = quizzes[quizId];

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(null);

  // TIMER STATES
  const TOTAL_TIME = 15;               // seconds per question
  const [timer, setTimer] = useState(TOTAL_TIME);
  const timerRef = useRef(null);

  // Shuffle options and reset for each new question:
  useEffect(() => {
    const current = questions[index];
    const orig = [...current.options];
    const shuffle = [...orig];
    for (let i = shuffle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffle[i], shuffle[j]] = [shuffle[j], shuffle[i]];
    }
    const correctText = orig[current.correct];
    setShuffledOptions(shuffle);
    setCorrectOptionIndex(shuffle.indexOf(correctText));
    setSelected(null);
    setAnswered(false);
    // RESET TIMER:
    setTimer(TOTAL_TIME);
  }, [index]);

  // Countdown effect:
  useEffect(() => {
    // Clear any existing interval
    if (timerRef.current) clearInterval(timerRef.current);

    // Start new one
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          // Auto-advance or finish
          if (index < questions.length - 1) {
            setIndex(i => i + 1);
          } else {
            navigation.replace("ResultScreen", {
              score,
              total: questions.length,
              quizId,
            });
          }
          return TOTAL_TIME; // reset for next usage
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(timerRef.current);
  }, [index]);

  const handleCheck = () => {
    if (selected === correctOptionIndex) setScore(s => s + 1);
    setAnswered(true);
  };

  const handleNext = () => {
    setIndex(i => i + 1);
  };

  const handleFinish = () => {
    navigation.replace("ResultScreen", {
      score,
      total: questions.length,
      quizId,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Heading */}
        <Text style={styles.heading}>
          📘 Question {index + 1} of {questions.length}
        </Text>

        {/* Timer Display */}
        <Text style={styles.timerText}>⏱️ {timer}s left</Text>
        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              { width: `${(timer / TOTAL_TIME) * 100}%` },
            ]}
          />
        </View>

        {/* Question */}
        <Text style={styles.question}>{questions[index].question}</Text>

        {/* Options */}
        {shuffledOptions.map((opt, i) => (
          <OptionButton
            key={i}
            option={opt}
            isSelected={selected === i}
            isCorrect={answered && i === correctOptionIndex}
            isWrong={answered && selected === i && selected !== correctOptionIndex}
            onPress={() => setSelected(i)}
          />
        ))}

        {/* Action Buttons */}
        <View style={styles.buttonGroup}>
          <Button
            title="Check Answer"
            onPress={handleCheck}
            disabled={selected === null || answered}
          />
          {index < questions.length - 1 ? (
            <Button title="Next" onPress={handleNext} />
          ) : (
            <Button title="Finish" onPress={handleFinish} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 5,
    color: "#444",
    textAlign: "center",
  },
  timerText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 5,
    color: "#e74c3c",
  },
  progressBackground: {
    height: 6,
    backgroundColor: "#ecf0f1",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 15,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#e74c3c",
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#222",
  },
  buttonGroup: {
    marginTop: 20,
    gap: 10,
  },
});

export default QuizScreen;