import React, { useState, useEffect } from "react";
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

useEffect(() => {
const currentQuestion = questions[index];
const originalOptions = [...currentQuestion.options];

const shuffled = [...originalOptions];
for (let i = shuffled.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
}

const correctAnswerText = originalOptions[currentQuestion.correct];
const newCorrectIndex = shuffled.indexOf(correctAnswerText);

setShuffledOptions(shuffled);
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

const handleNext = () => {
setIndex(index + 1);
};

const handleFinish = () => {
navigation.replace("ResultScreen", {
score,
total: questions.length,
});
};

return (
<SafeAreaView style={styles.container}>
<ScrollView contentContainerStyle={styles.scrollContainer}>
<Text style={styles.heading}>
📘 Question {index + 1} of {questions.length}
</Text>

<Text style={styles.question}>
      {questions[index].question}
    </Text>

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
marginBottom: 10,
color: "#444",
textAlign: "center",
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