import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import * as Notifications from "expo-notifications";

const Top = ({ navigation }) => {
  const [day, setDay] = useState(10);
  const [progress, setProgress] = useState(30);
  const progressAnim = useRef(new Animated.Value(0)).current; // 초기 값 0으로 설정

  useEffect(() => {
    // progress 상태가 변경될 때마다 애니메이션을 실행
    Animated.timing(progressAnim, {
      toValue: progress, // 최종 값은 progress 상태 값으로 설정
      duration: 500, // 애니메이션 지속 시간
      useNativeDriver: false, // width 속성을 애니메이션하기 때문에 false로 설정
    }).start();
  }, [progress]); // progress 값이 바뀔 때마다 애니메이션을 실행

  // progressAnim 값을 width 퍼센테이지로 변환
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={styles.text}>D - {day}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Goal")}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressWidth,
                },
              ]}
            />
            <Text
              style={{
                marginLeft: -20,
                fontSize: 16,
                fontWeight: 900,
                color: "#1F1F1F",
                transform: [{ translateY: 0 }, { translateX: 90 }],
              }}
            >
              {progress}%
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Image
            source={require("../assets/setting.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Notifications.scheduleNotificationAsync({
              content: {
                title: "Time's up!",
                body: "Change sides!",
              },
              trigger: {
                seconds: 10,
              },
            });
          }}
        >
          <Image
            source={require("../assets/notification.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

Top.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderWidth: 1.5,
    borderColor: "#1F1F1F",
    borderTopColor: "#fff",
    backgroundColor: "#FFF",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 52,
    paddingBottom: 12,
    alignItems: "center",
    gap: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F1F1F",
  },
  progressBar: {
    position: "relative",
    width: 175,
    height: 24,
    borderRadius: 29,
    borderWidth: 1.5,
    borderColor: "#1F1F1F",
    overflow: "hidden",
  },
  progressFill: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    backgroundColor: "#FFA851",
    borderRadius: 29,
  },
  icon: {
    height: 24,
    width: 24,
  },
});

export default Top;
