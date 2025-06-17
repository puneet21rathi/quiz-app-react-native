import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

const getIcon = (title) => {
  if (title.toLowerCase().includes("science")) return "⚛️";
  if (title.toLowerCase().includes("math")) return "➗";
  return "❓";
};

const QuizCard = ({ title, onPress }) => {
  const icon = getIcon(title);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#007bff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  iconContainer: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 22,
  },
});

export default QuizCard;
