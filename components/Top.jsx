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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { proxyUrl } from "../constant/common";

const Top = ({ navigation }) => {
  const inputURL = "/save";
  const cleanedURL = inputURL.replace(/[\u200B]/g, "");
  const url = proxyUrl + cleanedURL;
  const [day, setDay] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current; // 초기 값 0으로 설정
  const [saveData, setSaveData] = useState(false);
  // 절약 목표 조회
  const fetchData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (response.status === 200) {
        const SaveData = response.data;
        console.log("절약 목표 조회::", SaveData);
        setSaveData(true);
        setDay(SaveData.date);
        setProgress(SaveData.savePercentage);
      } else if (response.status === 404) {
        setSaveData(false);
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        {saveData ? (
          <Text style={styles.text}>D - {day}</Text>
        ) : (
          <Text style={styles.text}>D - ??</Text>
        )}
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
            {saveData ? (
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
            ) : (
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#1F1F1F",
                  alignSelf: "center",
                  marginTop: 1,
                }}
              >
                <Text style={{ fontWeight: "900" }}>절약 목표</Text>를
                설정해보세요!
              </Text>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Image
            source={require("../assets/setting.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* <TouchableOpacity
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
        > */}
        <TouchableOpacity onPress={() => navigation.navigate("Alarm")}>
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
    width: 200,
    height: 24,
    borderRadius: 29,
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
    backgroundColor: "#FFA851",
    borderRadius: 29,
  },
  icon: {
    height: 24,
    width: 24,
  },
});

export default Top;
