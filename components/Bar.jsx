import React, { useState, useRef, useEffect } from "react";
import { View, Text, Animated } from "react-native";
import { styles } from "./Bar.styles";

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

export default Bar;
