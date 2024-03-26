import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TopTooltip from "./Modal/topTooltip";
import { useSaveData } from "../context/saveDataContext";

const Top = ({ navigation }) => {
  const { saveData, fetchData } = useSaveData();
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [isOpenTopTooltip, setIsOpenTopTooltip] = useState(false);

  let backgroundColor = "#FFA851"; // 기본 색상

  if (saveData.isLoaded) {
    if (saveData.progress <= 20) {
      backgroundColor = "#F97B7B"; // 20 이하일 때 색상
    } else if (saveData.progress <= 49) {
      backgroundColor = "#FAC337"; // 49 이하일 때 색상
    } else if (saveData.progress <= 100) {
      backgroundColor = "#6ADCA3"; // 100 이하일 때 색상
    }
  }

  useEffect(() => {
    const checkTooltipShown = async () => {
      const hasShownTopTooltip = await AsyncStorage.getItem(
        "hasShownTopTooltip"
      );
      setIsOpenTopTooltip(hasShownTopTooltip !== "true");
    };

    checkTooltipShown();
  }, []);

  const openTopTooltip = () => {
    setIsOpenTopTooltip(false);
    AsyncStorage.setItem("hasShownTopTooltip", "true");
  };

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: saveData.progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [saveData.progress]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={[styles.text]}>
          D -&nbsp;
          {saveData ? (
            saveData.day
          ) : (
            <Text
              style={{
                fontFamily: "SUITE_Bold",
                fontWeight: "700",
                color: "#1F1F1F",
                fontSize: 16,
              }}
            >
              ??
            </Text>
          )}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Goal")}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressWidth,
                  backgroundColor: backgroundColor,
                },
              ]}
            />
            {saveData ? (
              <Text
                style={{
                  marginLeft: -20,
                  fontSize: 16,
                  fontFamily: "SUITE_Heavy",
                  fontWeight: "900",
                  color: "#1F1F1F",
                  transform: [{ translateY: 0 }, { translateX: 90 }],
                }}
              >
                {saveData.progress}%
              </Text>
            ) : (
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "SUITE_Heavy",
                    fontWeight: "900",
                    color: "#1F1F1F",
                  }}
                >
                  절약 목표
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "SUITE",
                      fontWeight: 500,
                      color: "#1F1F1F",
                      alignSelf: "center",
                      marginTop: 1,
                    }}
                  >
                    를 설정해보세요!
                  </Text>
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Image
            source={require("../assets/setting.png")}
            style={styles.icon}
          />
        </TouchableOpacity> */}

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
      <View>
        {isOpenTopTooltip && <TopTooltip openTopTooltip={openTopTooltip} />}
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
    fontWeight: 700,
    fontFamily: "SUITE_Bold",
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
    borderRadius: 29,
  },
  icon: {
    height: 24,
    width: 24,
  },
});

export default Top;
