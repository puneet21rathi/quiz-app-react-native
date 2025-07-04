import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

// Icon logic based on title
const getIcon = (title) => {
  if (title.toLowerCase().includes("science")) return "⚛️";
  if (title.toLowerCase().includes("math")) return "➗";
  return "❓";
};

const QuizCard = ({ title, onPress, isPopular }) => {
  const icon = getIcon(title);
  const [pressed, setPressed] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      activeOpacity={0.9}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.textContainer}>
        <View style={styles.row}>
          <Text style={styles.cardTitle}>{title}</Text>
          {isPopular && <Text style={styles.badge}>🔥 Popular</Text>}
        </View>
        <Text style={styles.subtext}>⏳ ~2 mins</Text>
      </View>
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
  cardPressed: {
    backgroundColor: "#005bb5",
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
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
  },
  badge: {
    backgroundColor: "#ffcc00",
    color: "#000",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 10,
  },
  subtext: {
    fontSize: 14,
    color: "#e0e0e0",
    marginTop: 4,
  },
});

export default QuizCard;
