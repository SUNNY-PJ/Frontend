import React from "react";
import { View, StyleSheet } from "react-native";

const Line = ({ color, h }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ flex: 1, height: h, backgroundColor: color }} />
    </View>
  );
};

export default Line;
