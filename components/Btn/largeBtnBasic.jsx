import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

const LargeBtnBasic = ({ text, onClick }) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 12,
        paddingHorizontal: 0,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: "#1F1F1F",
        backgroundColor: "white",
        shadowColor: "#1F1F1F",
        shadowOffset: { width: 1.5, height: 1.5 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 2,
        width: 335,
        height: 48,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onClick}
    >
      <Text style={{ color: "#1F1F1F", fontWeight: "bold" }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default LargeBtnBasic;
