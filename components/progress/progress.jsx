import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";

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
    outputRange: [0, 260], // 300 (전체 너비) - 32 (이미지 너비) = 268
  });

  return (
    <>
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
          style={[
            styles.progressFill,
            {
              width: progressWidth,
              backgroundColor: color,
            },
          ]}
        />
        <Image
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
    </>
  );
};

const styles = StyleSheet.create({
  progressFill: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    borderBottomLeftRadius: 29,
    borderTopLeftRadius: 29,
  },
});

export default Progress;
