import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";

const Bar = ({ text, path, progress }) => {
  // const [progress, setProgress] = useState(50);
  const progressAnim = useRef(new Animated.Value(0)).current;
  console.log("퍼센트", progress);

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

  // 숫자에 세 자리마다 쉼표를 추가하는 함수
  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formatNumberWithCommas(text)}원</Text>
      <View style={styles.progressContainer}>
        {/* <Image source={{ uri: path }} style={styles.image} />*/}
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progressWidth,
              },
            ]}
          />
          <Text style={styles.progressText}>{`${progress}%`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginTop: 12,
    // marginBottom: 12,
    alignItems: "center",
    // paddingLeft: 28,
    // paddingRight: 27,
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: "center",
  },
  text: {
    color: "#5C5C5C",
    fontSize: 15,
    fontFamily: "SUIT_Bold",
    alignSelf: "flex-end",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  progressBar: {
    position: "relative",
    width: "100%",
    // width: 335,
    height: 24,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "#1F1F1F",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  progressFill: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    backgroundColor: "#6ADCA3",
    borderRadius: 24,
    // borderColor: "#1F1F1F",
    // borderRightWidth: 1.5,
  },
  progressText: {
    // marginLeft: -20,
    left: 120,
    fontSize: 16,
    fontWeight: "900",
    color: "#1F1F1F",
  },
});

export default Bar;
