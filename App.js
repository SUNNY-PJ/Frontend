import React, { useEffect, useRef, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import * as Font from "expo-font";
import Navigation from "./Navigation";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// 알림 울리기
async function schedulePushNotification(data) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "테스트 알림",
      body: data,
    },
    trigger: null,
  });
}

export default function App() {
  const [pushToken, setPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // 폰트 적용
  const customFonts = {
    // SUIT
    SUIT_Thin: require("./assets/fonts/SUIT-Thin.otf"),
    SUIT_ExtraLight: require("./assets/fonts/SUIT-ExtraLight.otf"),
    SUIT_Light: require("./assets/fonts/SUIT-Light.otf"),
    SUIT: require("./assets/fonts/SUIT-Regular.otf"),
    SUIT_Medium: require("./assets/fonts/SUIT-Medium.otf"),
    SUIT_SemiBold: require("./assets/fonts/SUIT-SemiBold.otf"),
    SUIT_Bold: require("./assets/fonts/SUIT-Bold.otf"),
    SUIT_ExtraBold: require("./assets/fonts/SUIT-ExtraBold.otf"),
    SUIT_Heavy: require("./assets/fonts/SUIT-Heavy.otf"),
    // SUITE
    SUITE_Light: require("./assets/fonts/SUITE-Light.otf"),
    SUITE: require("./assets/fonts/SUITE-Regular.otf"),
    SUITE_Medium: require("./assets/fonts/SUITE-Medium.otf"),
    SUITE_SemiBold: require("./assets/fonts/SUITE-SemiBold.otf"),
    SUITE_Bold: require("./assets/fonts/SUITE-Bold.otf"),
    SUITE_ExtraBold: require("./assets/fonts/SUITE-ExtraBold.otf"),
    SUITE_Heavy: require("./assets/fonts/SUITE-Heavy.otf"),
  };
  async function loadFonts() {
    await Font.loadAsync(customFonts);
  }

  useEffect(() => {
    loadFonts();
  }, []);

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("알림을 거부하였습니다. 앱에 대한 알림을 받을 수 없습니다.");
        return;
      }

      const { data } = await Notifications.getExpoPushTokenAsync();
      console.log("Expo Push Token:", data);
      await AsyncStorage.setItem("device_token", data);
      const device_token = await AsyncStorage.getItem("device_token");
      console.log("이게 디바이스 토큰이지이이이", device_token);

      const expoPushToken = `${data}`;

      // 정규 표현식을 사용하여 토큰 값 추출
      const tokenRegex = /\[([^\]]+)\]/;
      const match = expoPushToken.match(tokenRegex);

      // match 배열의 두 번째 요소에 토큰 값이 있음
      // 이게 진짜 토큰임
      const token = match && match[1];

      console.log("푸시 토큰 값:", token);

      return data;
    };

    const initPushNotifications = async () => {
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      const pushToken = await registerForPushNotificationsAsync();
      setPushToken(pushToken);
      console.log(pushToken);

      Notifications.addNotificationReceivedListener((notification) => {
        console.log("NOTIFICATION:", notification);
      });

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });
    };

    initPushNotifications();

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // 알림 예약 함수 호출
  const handleScheduleNotification = async () => {
    const notificationData = "알림 내용을 여기에 입력하세요";
    await schedulePushNotification(notificationData);
  };

  // return <Navigation handleScheduleNotification={handleScheduleNotification} />;
  return <Navigation />;
}
