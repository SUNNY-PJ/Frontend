import React from "react";
import { View, StyleSheet } from "react-native";

const Line = ({ color }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ flex: 1, height: 2, backgroundColor: color }} />
    </View>
  );
};

export default Line;
