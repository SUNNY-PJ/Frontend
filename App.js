import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
// import * as Permissions from 'expo-permissions';
import { Alert, ActivityIndicator } from "react-native";
import * as Font from "expo-font";
import Navigation from "./Navigation";
import { jwtDecode } from "jwt-decode";
import { proxyUrl } from "./api/common";
import apiClient from "./api/apiClient";
import * as SplashScreen from "expo-splash-screen";
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://c95d443b0c9028d7f8de457dd4c374db@o4507425556463616.ingest.us.sentry.io/4507425560461312",
});

const projectId = Constants.expoConfig.extra.eas.projectId;

console.log("project Id 입니다 :::", projectId);

// Notifications setup
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
  projectId: projectId,
});

// 알림 울리기
// async function schedulePushNotification(data) {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "테스트 알림",
//       body: data,
//     },
//     trigger: null,
//   });
// }

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  const [pushToken, setPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

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
    setFontsLoaded(true);
  }

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFonts();
        await checkTokenExpiry();
        await initPushNotifications();

        setTimeout(async () => {
          await SplashScreen.hideAsync();
        }, 1200);
      } catch (error) {
        console.error("Initialization error:", error);
        await SplashScreen.hideAsync();
      }
    };

    initializeApp();

    return () => {
      if (notificationListener.current && responseListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  // async function registerForPushNotificationsAsync() {
  //   if (Constants.isDevice) {
  //     const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  //     let finalStatus = existingStatus;

  //     if (existingStatus !== 'granted') {
  //       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //       finalStatus = status;
  //     }

  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!');
  //       return;
  //     }

  //     const token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);
  //     return token;
  //   } else {
  //     alert('Must use physical device for Push Notifications');
  //   }
  // }

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert(
        "",
        "알림을 거부하였습니다. 앱에 대한 알림을 받을 수 없습니다."
      );
      return;
    }

    const { data } = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });

    console.log("Expo Push Token:", data);
    await AsyncStorage.setItem("device_token", data);
    const device_token = await AsyncStorage.getItem("device_token");
    console.log("이게 디바이스 토큰이지이이이", device_token);

    return data;
  };

  const initPushNotifications = async () => {
    const pushToken = await registerForPushNotificationsAsync();
    setPushToken(pushToken);
    console.log(pushToken);

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
  };

  // const handleScheduleNotification = async () => {
  //   const notificationData = "알림 내용을 여기에 입력하세요";
  //   await schedulePushNotification(notificationData);
  // };

  const refreshToken = async () => {
    const inputURL = proxyUrl + `/apple/auth/reissue`;
    const refresh_token = await AsyncStorage.getItem("refresh_token");

    try {
      const response = await apiClient.get(inputURL, {
        params: { refresh_token },
      });

      const access_token = response.data.data.accessToken;
      const new_refresh_token = response.data.data.refreshToken;
      await AsyncStorage.setItem("access_token", access_token);
      await AsyncStorage.setItem("refresh_token", new_refresh_token);
      console.log("새로운 토큰 저장:", access_token);
      setIsSignedIn(!!access_token);
      return access_token;
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
      Alert.alert(
        "Authentication Error",
        "세션이 만료되었습니다. 다시 로그인해주세요."
      );
      setIsSignedIn(false);
      return null;
    }
  };

  const checkTokenExpiry = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    if (access_token) {
      const decoded = jwtDecode(access_token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        await refreshToken();
      } else {
        setIsSignedIn(true);
      }
    } else {
      setIsSignedIn(false);
    }
  };

  if (isSignedIn === null) {
    return null; // 로딩 화면 표시
  }

  return (
    <>
      {fontsLoaded ? (
        <Navigation />
      ) : (
        <ActivityIndicator size="large" color="#000" />
      )}
    </>
  );
}
