import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const RadioBtn = ({ text }) => {
  const [state, setState] = useState(false);

  const handleRadioBtnClick = () => {
    setState(!state);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleRadioBtnClick}>
        {state ? (
          <Image source={require("../assets/community.png")} />
        ) : (
          <Image source={require("../assets/community.png")} />
        )}
      </TouchableOpacity>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  button: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#1F1F1F",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: "#5C5C5C",
  },
});

export default RadioBtn;
