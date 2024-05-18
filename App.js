import React, { useEffect, useRef, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import * as Font from "expo-font";
import Navigation from "./Navigation";
import { Alert, ActivityIndicator } from "react-native";
import { jwtDecode } from "jwt-decode";
import { proxyUrl } from "./constant/common";
import "core-js/stable/atob";
import apiClient from "./api/apiClient";
import * as SplashScreen from "expo-splash-screen";
// import { decode } from "base-64";
// global.atob = decode;

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
    loadFonts();
  }, []);

  useEffect(() => {
    async function prepare() {
      // Prevent splash screen from hiding
      await SplashScreen.preventAutoHideAsync();
      // Artificial delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Hide splash screen
      await SplashScreen.hideAsync();
      // Set app as ready
      setIsSignedIn(true);
    }

    prepare();
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
        Alert.alert(
          "",
          "알림을 거부하였습니다. 앱에 대한 알림을 받을 수 없습니다."
        );
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

  const refreshToken = async () => {
    console.log("리프레시 토큰 ");
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
      setIsSignedIn(false); // 토큰 갱신 실패 시 로그아웃 처리
      return null;
    }
  };

  const checkTokenExpiry = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    console.log("1111");
    if (access_token) {
      console.log("222");
      const decoded = jwtDecode(access_token);
      console.log("decoded", decoded);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        console.log("토큰 만료됨, 갱신 시도...");
        await refreshToken(); // 토큰 갱신 시도 후 로그인 상태는 refreshToken 함수 내에서 설정
      } else {
        console.log("토큰 유효함");
        setIsSignedIn(true);
      }
    } else {
      setIsSignedIn(false); // 토큰이 없는 경우 로그아웃 처리
    }
  };

  useEffect(() => {
    checkTokenExpiry();
  }, []);

  // // 로그인 상태 확인
  // const checkSignInStatus = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem("access_token");
  //   } catch (e) {
  //     // 에러 처리
  //     console.error(e);
  //   }
  // };

  // useEffect(() => {
  //   checkSignInStatus();
  // }, []);

  // return <Navigation handleScheduleNotification={handleScheduleNotification} />;
  if (isSignedIn === null) {
    return null; // 로딩 화면 표시
  }

  return (
    <>
      {fontsLoaded ? (
        <Navigation isSignedIn={isSignedIn} />
      ) : (
        <ActivityIndicator size="large" color="#000" />
      )}
    </>
  );
}
