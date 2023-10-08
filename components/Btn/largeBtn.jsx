import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const LargeBtn = ({ text, onClick, backgroundColor }) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 12,
        paddingHorizontal: 0,
        borderRadius: 8,
        borderWidth: 1.5,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        borderColor: "#1F1F1F",
        backgroundColor: backgroundColor || "#FFC891",
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
      <Text style={{ color: "#1F1F1F ", fontSize: 20, fontWeight: 700 }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default LargeBtn;
