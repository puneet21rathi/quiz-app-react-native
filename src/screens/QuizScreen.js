import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  Platform,
  View,
  BackHandler,
  Alert,
} from "react-native";
import OptionButton from "../components/OptionButton";

const quizzes = {
  "1": [
    {
      question: "What is H2O?",
      options: ["Oxygen", "Water", "Hydrogen", "Carbon"],
      correct: 1,
      difficulty: "Easy",
    },
    {
      question: "What is the sun?",
      options: ["Planet", "Star", "Asteroid", "Comet"],
      correct: 1,
      difficulty: "Medium",
    },
    {
      question: "Which gas do plants absorb?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correct: 1,
      difficulty: "Easy",
    },
    {
      question: "Earth's largest ocean?",
      options: ["Atlantic", "Pacific", "Indian", "Arctic"],
      correct: 1,
      difficulty: "Medium",
    },
    {
      question: "Which organ pumps blood?",
      options: ["Liver", "Heart", "Brain", "Lungs"],
      correct: 1,
      difficulty: "Easy",
    },
  ],
  "2": [
    {
      question: "2 + 2 =",
      options: ["3", "4", "5", "6"],
      correct: 1,
      difficulty: "Easy",
    },
    {
      question: "5 x 3 =",
      options: ["10", "15", "20", "25"],
      correct: 1,
      difficulty: "Medium",
    },
    {
      question: "Square root of 16?",
      options: ["2", "4", "8", "16"],
      correct: 1,
      difficulty: "Medium",
    },
    {
      question: "10 / 2 =",
      options: ["2", "5", "8", "10"],
      correct: 1,
      difficulty: "Easy",
    },
    {
      question: "20 - 5 =",
      options: ["10", "15", "20", "25"],
      correct: 1,
      difficulty: "Easy",
    },
  ],
};

const QuizScreen = ({ route, navigation }) => {
  const { quizId, quizTitle } = route.params;
  const questions = quizzes[quizId];

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(null);

  const TOTAL_TIME = 15;
  const [timer, setTimer] = useState(TOTAL_TIME);
  const timerRef = useRef(null);

  // 🆕 Exit confirmation alert on back press
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Hold on!",
        "Are you sure you want to exit the quiz?",
        [
          { text: "No", onPress: () => null, style: "cancel" },
          {
            text: "Yes",
            onPress: () => navigation.replace("HomeScreen"),
          },
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  // Shuffle and reset
  useEffect(() => {
    const current = questions[index];
    const options = [...current.options];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    const correctAnswerText = current.options[current.correct];
    const newCorrectIndex = options.indexOf(correctAnswerText);

    setShuffledOptions(options);
    setCorrectOptionIndex(newCorrectIndex);
    setSelected(null);
    setAnswered(false);
    setTimer(TOTAL_TIME);
  }, [index]);

  // Timer logic
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          if (index < questions.length - 1) {
            setIndex((i) => i + 1);
          } else {
            navigation.replace("ResultScreen", {
              score,
              total: questions.length,
              quizId,
              quizTitle,
            });
          }
          return TOTAL_TIME;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [index]);

  const handleCheck = () => {
    if (selected === correctOptionIndex) setScore((s) => s + 1);
    setAnswered(true);
  };

  const handleNext = () => setIndex((i) => i + 1);

  const handleFinish = () => {
    navigation.replace("ResultScreen", {
      score,
      total: questions.length,
      quizId,
      quizTitle,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* 🧠 Quiz Title */}
        <Text style={styles.quizTitle}>🧠 {quizTitle}</Text>

        {/* 📘 Progress */}
        <Text style={styles.heading}>
          📘 Question {index + 1} of {questions.length}
        </Text>

        {/* 🏷️ Difficulty */}
        <Text
          style={[
            styles.difficulty,
            {
              color:
                questions[index].difficulty === "Easy"
                  ? "#28a745"
                  : questions[index].difficulty === "Medium"
                  ? "#ffc107"
                  : "#dc3545",
            },
          ]}
        >
          🏷️ Difficulty: {questions[index].difficulty}
        </Text>

        {/* ⏱️ Timer */}
        <Text style={styles.timerText}>⏱️ {timer}s left</Text>
        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              { width: `${(timer / TOTAL_TIME) * 100}%` },
            ]}
          />
        </View>

        {/* ❓ Question */}
        <Text style={styles.question}>{questions[index].question}</Text>

        {/* 🟢 Options */}
        {shuffledOptions.map((opt, i) => (
          <OptionButton
            key={i}
            option={opt}
            isSelected={selected === i}
            isCorrect={answered && i === correctOptionIndex}
            isWrong={
              answered && selected === i && selected !== correctOptionIndex
            }
            onPress={() => setSelected(i)}
          />
        ))}

        {/* Buttons */}
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
  quizTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#007bff",
    marginBottom: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "#444",
  },
  difficulty: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
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
