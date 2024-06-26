import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const InputMax = ({ placeholder, inputValue, handleInputChange, height }) => {
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
            borderColor: isInputFocused
              ? "#FFA851"
              : inputValue
              ? "#1F1F1F"
              : "#C1C1C1",
            borderBottomWidth: isInputFocused ? 1.5 : inputValue ? 3 : 1.5,
            borderRightWidth: isInputFocused ? 1.5 : inputValue ? 3 : 1.5,
            height: height ? height : "auto",
            minHeight: height ? "auto" : 180,
            maxHeight: height ? "auto" : 250,
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
    paddingVertical: 14,
    paddingHorizontal: 11,
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 1.5,
    borderRadius: 8,
    alignSelf: "center",
    backgroundColor: "#fff",
    fontFamily: "SUITE_Medium",
  },
});

export default InputMax;
