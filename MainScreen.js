import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Splash from "./screen/splash";
import FriendsList from "./screen/Friends/friendsList";
import Note from "./constant/note";
import Statistics from "./screen/Statistic/statistics";
import Top from "./components/Top";
import Bottom from "./components/Bottom";
import Login from "./screen/Login";
import SignUp from "./constant/SignUp";
import Kakao from "./constant/kakao";
import Spending from "./screen/Statistic/spending";
import History from "./screen/Statistic/history";
import ApiTest from "./constant/apiTest";
import Community from "./screen/Community/community";
import MyPage from "./screen/MyPage/myPage";
import SettingProfile from "./screen/MyPage/settingProfile";
import MyInfo from "./screen/MyPage/myInfo";
import MyScrap from "./screen/MyPage/myScrap";
import MyWrite from "./screen/MyPage/myWrite";
import MyComment from "./screen/MyPage/myComment";
import FriendProfile from "./screen/Friends/friendProfile";
import Post from "./screen/Community/post";
import Modify from "./screen/Community/modify";
import Detail from "./screen/Community/detail";
import Goal from "./constant/goal";
import Chat from "./screen/Chat/chat";
import Chat2 from "./screen/Chat/chat2";
import FriendWrite from "./screen/Friends/friendWrite";
import FriendComment from "./screen/Friends/friendComment";
import ChatList from "./screen/Chat/chatList";
import Winner from "./screen/Battle/winner";
// import ChatRoom from "./screen/Chat/chatRoom";

const Stack = createStackNavigator();

function MainScreen() {
  return (
    // <Stack.Navigator initialRouteName="Splash">
    <>
      <Stack.Navigator
        screenOptions={{
          header: (props) => <Top {...props} />,
        }}
      >
        {/* <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="Kakao"
          component={Kakao}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="FriendsList" component={FriendsList} />
        <Stack.Screen name="Note" component={Note} />
        <Stack.Screen name="Statistics" component={Statistics} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Spending" component={Spending} />
        <Stack.Screen name="ApiTest" component={ApiTest} />
        <Stack.Screen name="Community" component={Community} />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="SettingProfile" component={SettingProfile} />
        <Stack.Screen name="MyInfo" component={MyInfo} />
        <Stack.Screen name="MyScrap" component={MyScrap} />
        <Stack.Screen name="MyWrite" component={MyWrite} />
        <Stack.Screen name="MyComment" component={MyComment} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="FriendProfile"
          component={FriendProfile}
        />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="Modify" component={Modify} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Goal" component={Goal} />
        <Stack.Screen name="FriendWrite" component={FriendWrite} />
        <Stack.Screen name="FriendComment" component={FriendComment} />
        <Stack.Screen name="ChatList" component={ChatList} />
        {/* <Stack.Screen name="ChatRoom" component={ChatRoom} /> */}
        {/* <Stack.Screen name="Winner" component={Winner} /> */}
        {/* <Stack.Screen
          name="Chat2"
          component={Chat2}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          options={{ headerShown: false }}
          name="Chat"
          component={Chat}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Chat2"
          component={Chat2}
        /> */}
      </Stack.Navigator>
      <Bottom />
    </>
  );
}
export default MainScreen;
