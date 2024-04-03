import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { Alert } from "react-native";
import Navigation from "./Navigation";

const Stack = createNativeStackNavigator();

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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.responseListener = React.createRef();
    this.notificationListener = React.createRef();
    this.state = {
      pushToken: "",
      notification: false,
    };
  }

  // 이벤트 등록
  async componentDidMount() {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    // iOS에서는 Permissions.getPermissionsAsync()를 사용하지 않음
    // 대신 registerForPushNotificationsAsync() 함수를 사용하여 알림을 등록
    const { data: pushToken } = await registerForPushNotificationsAsync();
    this.setState({ pushToken });
    console.log("디바이스 토큰:", pushToken);

    Notifications.addNotificationReceivedListener((notification) => {
      console.log("NOTIFICATION:", notification);
    });
    this.notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        this.setState({ notification: notification });
      });
    this.responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
  }

  // 이벤트 해제
  componentWillUnmount() {
    Notifications.removeNotificationSubscription(this.responseListener.current);
    Notifications.removeNotificationSubscription(
      this.notificationListener.current
    );
  }

  // 알림 예약 함수 호출
  handleScheduleNotification = async () => {
    const notificationData = "알림 내용을 여기에 입력하세요";
    await schedulePushNotification(notificationData);
  };

  render() {
    return (
      <Navigation
        handleScheduleNotification={this.handleScheduleNotification}
      />
    );
  }
}

// iOS에서는 Permissions.getPermissionsAsync()를 사용하지 않습니다.
// 대신에 아래 함수를 사용하여 알림을 등록합니다.
async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    Alert.alert("Failed to get push token for push notification!");
    return;
  }

  return await Notifications.getExpoPushTokenAsync();
}
