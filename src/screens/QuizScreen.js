import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  Platform,
} from "react-native";
import OptionButton from "../components/OptionButton";

const quizzes = {
  "1": [
    {
      question: "What is H2O?",
      options: ["Oxygen", "Water", "Hydrogen", "Carbon"],
      correct: 1,
    },
    {
      question: "What is the sun?",
      options: ["Planet", "Star", "Asteroid", "Comet"],
      correct: 1,
    },
    {
      question: "Which gas do plants absorb?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correct: 1,
    },
    {
      question: "Earth's largest ocean?",
      options: ["Atlantic", "Pacific", "Indian", "Arctic"],
      correct: 1,
    },
    {
      question: "Which organ pumps blood?",
      options: ["Liver", "Heart", "Brain", "Lungs"],
      correct: 1,
    },
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

  // Shuffle options on each new question
  useEffect(() => {
    const currentQuestion = questions[index];
    const options = [...currentQuestion.options];

    // Fisher-Yates Shuffle
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    const correctAnswerText = currentQuestion.options[currentQuestion.correct];
    const newCorrectIndex = options.indexOf(correctAnswerText);

    setShuffledOptions(options);
    setCorrectOptionIndex(newCorrectIndex);
    setSelected(null);
    setAnswered(false);
  }, [index]);

  const handleCheck = () => {
    if (selected === correctOptionIndex) {
      setScore(score + 1);
    }
    setAnswered(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.question}>{questions[index].question}</Text>

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

        <Button
          title="Check Answer"
          onPress={handleCheck}
          disabled={selected === null || answered}
        />

        {index < questions.length - 1 ? (
          <Button
            title="Next"
            onPress={() => {
              setIndex(index + 1);
            }}
          />
        ) : (
          <Button
            title="Finish"
            onPress={() =>
              navigation.replace("ResultScreen", {
                score,
                total: questions.length,
              })
            }
          />
        )}
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
    paddingBottom: 20,
    justifyContent: "center",
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default QuizScreen;
