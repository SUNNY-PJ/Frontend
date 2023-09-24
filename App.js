import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FriendsList from "./constant/friendsList";
import Note from "./constant/note";
import Statistics from "./constant/statistics";
import Top from "./components/Top";
import Bottom from "./components/Bottom";
import Login from "./constant/Login";
import SiginUp from "./constant/SiginUp";
import Kakao from "./constant/kakao";
import Spending from "./constant/spending";
import History from "./constant/history";
import ApiTest from "./constant/apiTest";
import Community from "./constant/Community/community";
import * as Notifications from "expo-notifications";

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
    console.log("111111111");
    if (Platform.OS === "android") {
      console.log("222222");

      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    const { granted } = await Notifications.getPermissionsAsync();
    if (granted) {
      console.log("33333");

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

  render() {
    return (
      // NavigationContainer로 감싸야 함.
      <NavigationContainer>
        {/* <Top /> */}
        <Stack.Navigator
          // initialRouteName="Note"
          screenOptions={{
            header: (props) => <Top {...props} />,
          }}
        >
          <Stack.Screen name="FriendsList" component={FriendsList} />
          <Stack.Screen name="Note" component={Note} />
          <Stack.Screen name="Statistics" component={Statistics} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Kakao"
            component={Kakao}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Spending" component={Spending} />
          <Stack.Screen name="SiginUp" component={SiginUp} />
          <Stack.Screen name="ApiTest" component={ApiTest} />
          <Stack.Screen name="Community" component={Community} />
        </Stack.Navigator>
        <Bottom />
      </NavigationContainer>
    );
  }
}
