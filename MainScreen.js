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
import Search from "./screen/Community/search";
import Alarm from "./screen/Alarm/alarm";
import Report from "./screen/report/report";
import Terms from "./screen/terms/terms";
import SettingAlarm from "./screen/MyPage/settingAlarm";
import SendMatch from "./screen/Battle/sendMatch";
import BattleStatus from "./screen/Battle/battleStatus";
import BattleStatusDisable from "./screen/Battle/battleStatusDisable";
import BottomRe from "./components/BottomRe";
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
        <Stack.Screen
          options={{ headerShown: false }}
          name="Search"
          component={Search}
        />
        <Stack.Screen name="Alarm" component={Alarm} />
        <Stack.Screen name="Report" component={Report} />
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="SettingAlarm" component={SettingAlarm} />
        <Stack.Screen name="SendMatch" component={SendMatch} />
        <Stack.Screen name="BattleStatus" component={BattleStatus} />
        <Stack.Screen
          name="BattleStatusDisable"
          component={BattleStatusDisable}
        />
        {/* <Stack.Screen name="Winner" component={Winner} /> */}
      </Stack.Navigator>
      {/* <Bottom /> */}
      <BottomRe />
    </>
  );
}
export default MainScreen;
