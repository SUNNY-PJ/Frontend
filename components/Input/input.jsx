import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const Input = ({ placeholder }) => {
  const [isInputFocused, setInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState(""); // 입력값 상태 추가

  const handleFocus = () => {
    setInputFocused(true);
  };

  const handleBlur = () => {
    setInputFocused(false);
  };

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={inputValue}
        onChangeText={handleInputChange}
        style={[
          styles.input,
          {
            borderColor: inputValue
              ? "#1F1F1F"
              : isInputFocused
              ? "#FFA851"
              : "#C1C1C1",
          },
        ]}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // paddingLeft: 28,
  },
  input: {
    width: "100%",
    height: 48,
    paddingVertical: 14,
    paddingHorizontal: 11,
    borderWidth: 1.5,
    borderRadius: 8,
    alignSelf: "center",
    color: "black",
  },
});

export default Input;
