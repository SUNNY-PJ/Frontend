import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const MiddleBtnBlack = ({ text, onClick }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onClick}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#1F1F1F",
    backgroundColor: "#1F1F1F",
    width: 144,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
});

export default MiddleBtnBlack;
