import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet, Dimensions } from "react-native";

const Splash = ({ onAnimationEnd }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const translateY = useRef(new Animated.Value(300)).current;
  const translateYSecondImage = useRef(new Animated.Value(300)).current; // 두 번째 이미지를 위한 애니메이션 값

  useEffect(() => {
    // 첫 번째 이미지 애니메이션
    Animated.timing(translateY, {
      toValue: 0,
      duration: 1500, // 지속 시간을 1500ms로 줄임
      useNativeDriver: true,
    }).start(() => {
      // 두 번째 이미지 애니메이션 시작
      Animated.timing(translateYSecondImage, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }).start(onAnimationEnd); // 두 번째 이미지 애니메이션이 끝나면 onAnimationEnd 호출
    });
  }, [translateY, translateYSecondImage, onAnimationEnd]);

  return (
    <View style={styles.container}>
      <View
        style={
          {
            // paddingTop: windowHeight * 0.35,
            // paddingRight: 120,
            // paddingLeft: 120,
          }
        }
      >
        <Animated.Image
          source={require("../assets/splash.png")}
          style={{
            transform: [{ translateY }],
            // height: windowHeight * 0.65,
            width: 300,
          }}
        />

        <Animated.Image
          source={require("../assets/splashText.png")} // 두 번째 이미지 경로
          style={[
            styles.secondImage,
            {
              // height: 500,
              // width: windowWidth * 0.33,
              transform: [{ translateY: translateYSecondImage }],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  secondImage: {
    position: "absolute",
    width: 80,
    height: 244,
    resizeMode: "contain",
  },
});

export default Splash;
