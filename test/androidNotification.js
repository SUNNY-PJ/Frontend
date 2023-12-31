import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

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
    const { granted } = await Notifications.getPermissionsAsync();
    if (granted) {
      const { data } = await Notifications.getExpoPushTokenAsync();
      this.setState({ pushToken: data });
      console.log("디바이스 토큰:", data);
    } else if (!granted) {
      alert("알림이 거부 되었습니다.");
    } else {
      alert("알림이 지원 되지않습니다.");
    }
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
    const notificationData = "알림 내용 여기에 입력하면 됨";
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
