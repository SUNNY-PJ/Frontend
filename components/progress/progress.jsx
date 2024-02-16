import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Image, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Progress = ({ progress, color }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  const imageLeft = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 268], // 전체 너비에서 이미지 너비를 뺀 값
  });

  return (
    <View
      style={{
        alignSelf: "center",
        width: 300,
        height: 32,
        borderRadius: 32,
        borderWidth: 1.5,
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      <Animated.View
        style={{
          width: progressWidth,
          height: "100%",
        }}
      >
        <LinearGradient
          colors={["#fff", color]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            height: "100%",
            borderRadius: 29,
          }}
        />
      </Animated.View>
      <Animated.Image
        source={require("../../assets/barIcon.png")}
        style={{
          width: 32,
          height: 32,
          position: "absolute",
          left: imageLeft,
        }}
      />
    </View>
  );
};

export default Progress;
