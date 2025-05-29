import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const OptionButton = ({ option, isSelected, isCorrect, isWrong, onPress }) => {
  const getBackgroundStyle = () => {
    if (isCorrect) return styles.correct;
    if (isWrong) return styles.wrong;
    if (isSelected) return styles.selected;
    return styles.default;
  };

  return (
    <TouchableOpacity
      style={[styles.optionButton, getBackgroundStyle()]}
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
    borderRadius: 5,
    alignItems: "center",
  },
  default: {
    backgroundColor: "#ddd",
  },
  selected: {
    backgroundColor: "#b3d9ff",
  },
  correct: {
    backgroundColor: "#5cb85c",
  },
  wrong: {
    backgroundColor: "#d9534f",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OptionButton;
