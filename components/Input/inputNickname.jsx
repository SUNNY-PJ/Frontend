import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const InputNickName = ({ placeholder, inputValue, handleInputChange }) => {
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
    backgroundColor: "#fff",
  },
});

export default InputNickName;
