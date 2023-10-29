import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const InputMax = ({ placeholder, inputValue, handleInputChange }) => {
  const [isInputFocused, setInputFocused] = useState(false);

  const handleFocus = () => {
    setInputFocused(true);
  };

  const handleBlur = () => {
    setInputFocused(false);
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
            borderBottomWidth: inputValue ? "3px" : "1.5px",
            borderRightWidth: inputValue ? "3px" : "1.5px",
          },
        ]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        multiline={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  input: {
    width: "100%",
    minHeight: 180,
    paddingVertical: 14,
    paddingHorizontal: 11,
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 1.5,
    borderRadius: 8,
    alignSelf: "center",
    backgroundColor: "#fff",
  },
});

export default InputMax;
