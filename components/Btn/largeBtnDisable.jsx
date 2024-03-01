import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

const LargeBtnDisable = ({ text, onClick }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        paddingVertical: 12,
        paddingHorizontal: 0,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: "#C1C1C1",
        backgroundColor: "white",
        shadowColor: "#1F1F1F",
        shadowOffset: { width: 1.5, height: 1.5 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 2,
        width: "100%",
        // height: 48,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onClick}
    >
      <Text
        style={{ color: "#5C5C5C", fontSize: 20, fontFamily: "SUITE_Bold" }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default LargeBtnDisable;
