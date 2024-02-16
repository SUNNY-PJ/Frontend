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
    // progress 상태가 변경될 때마다 애니메이션을 실행
    Animated.timing(progressAnim, {
      toValue: progress, // 최종 값은 progress 상태 값으로 설정
      duration: 500, // 애니메이션 지속 시간
      useNativeDriver: false, // width 속성을 애니메이션하기 때문에 false로 설정
    }).start();
  }, [progress]);

  // progressAnim 값을 width 퍼센테이지로 변환
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
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
          source={require("../../assets/barIcon.png")}
          style={{
            width: 32,
            height: 32,
            alignSelf: "center",
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
    backgroundColor: "#FFA851",
    borderRadius: 29,
  },
});

export default Progress;
