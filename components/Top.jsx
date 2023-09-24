import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as Notifications from "expo-notifications";

const Top = ({ navigation }) => {
  const [progress, setProgress] = useState(50);

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={styles.text}>D - {progress}%</Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress}%`,
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
            NN%
          </Text>
        </View>
        <Image source={require("../assets/setting.png")} style={styles.icon} />
        <TouchableOpacity
          onPress={() => {
            Notifications.scheduleNotificationAsync({
              content: {
                title: "알림 테스트입니다.",
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
