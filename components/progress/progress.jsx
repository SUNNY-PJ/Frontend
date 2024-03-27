import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Image, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Progress = ({ progress, color }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  let backgroundColor = "#FFA851"; // 기본값 설정

  if (progress <= 20) {
    backgroundColor = "#F97B7B"; // 20 이하일 때 색상
  } else if (progress <= 49) {
    backgroundColor = "#FAC337"; // 49 이하일 때 색상
  } else if (progress <= 100) {
    backgroundColor = "#6ADCA3"; // 100 이하일 때 색상
  }

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: Math.abs(progress), // 절대값 사용
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

  useEffect(() => {
    // progress 값이 숫자인지 확인
    const numericProgress = Number.isFinite(progress) ? progress : 0;
    Animated.timing(progressAnim, {
      toValue: numericProgress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

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
          colors={["#fff", color || backgroundColor]}
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
