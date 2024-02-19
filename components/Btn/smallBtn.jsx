import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const SmallBtn = ({ onClick, title, color, border }) => {
  return (
    <>
      <TouchableOpacity onPress={onClick}>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#1F1F1F",
            backgroundColor: color ? color : "#FFC891",
            borderRadius: border ? border : 6,
          }}
        >
          <Text
            style={{
              paddingRight: 10,
              paddingLeft: 10,
              paddingTop: 4,
              paddingBottom: 4,
              fontSize: 12,
              fontWeight: 500,
              borderColor: "#1F1F1F",
              fontFamily: "SUITE_Bold",
              color: "#1F1F1F",
            }}
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default SmallBtn;
