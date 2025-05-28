import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const OptionButton = ({ option, isSelected, isCorrect, isWrong, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.optionButton,
        isSelected && styles.selected,
        isCorrect && styles.correct,
        isWrong && styles.wrong,
      ]}
      onPress={onPress}
      disabled={isCorrect || isWrong}
    >
      <Text style={styles.optionText}>
        {option} {isCorrect ? "✅" : isWrong ? "❌" : ""}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionButton: {
    padding: 12,
    marginVertical: 5,
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignItems: "center",
  },
  optionText: { fontSize: 16, fontWeight: "bold" },
  selected: { backgroundColor: "#b3d9ff" },
  correct: { backgroundColor: "#5cb85c" },
  wrong: { backgroundColor: "#d9534f" },
});

export default OptionButton;
