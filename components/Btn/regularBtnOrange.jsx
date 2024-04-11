import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RegularBtnOrange = ({ text }) => {
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.button}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 140,
    backgroundColor: "#FFC891",
    alignSelf: "center",
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "#1F1F1F",
    borderBottomWidth: 3,
    borderRightWidth: 3,
    paddingBottom: 10,
    paddingTop: 10,
  },
  button: {
    fontSize: 16,
    textAlign: "center",
    color: "#1F1F1F",
    fontFamily: "SUITE_Bold",
  },
});

export default RegularBtnOrange;
