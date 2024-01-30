import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const InputNickName = ({
  placeholder,
  inputValue,
  handleInputChange,
  onValidation,
}) => {
  const [isInputFocused, setInputFocused] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const valid = isValidInput(inputValue);
    setIsValid(valid);
    if (onValidation) {
      onValidation(valid);
    }
  }, [inputValue, onValidation]);

  const isValidInput = (value) => {
    const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;
    return value.length >= 2 && value.length <= 10 && !emojiRegex.test(value);
  };

  const handleFocus = () => {
    setInputFocused(true);
  };

  const handleBlur = () => {
    setInputFocused(false);
    setIsValid(isValidInput(inputValue));
  };

  const borderColor = () => {
    if (inputValue && !isValid) {
      return "#FF0000";
    } else if (!isInputFocused && isValid && inputValue) {
      return "#000000";
    }
    return isInputFocused ? "#FFA851" : "#C1C1C1";
  };

  const borderWidth = () => {
    return !isInputFocused && isValid && inputValue ? 3 : 1.5;
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
            borderColor: borderColor(),
            borderBottomWidth: borderWidth(),
            borderRightWidth: borderWidth(),
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
  },
  input: {
    width: "100%",
    height: 48,
    paddingVertical: 14,
    paddingHorizontal: 11,
    borderRadius: 8,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderWidth: 1.5,
  },
});

export default InputNickName;
