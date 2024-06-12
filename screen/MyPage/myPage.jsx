import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import Line from "../../components/Line";
import * as Notifications from "expo-notifications";
import ToggleBtn from "../../components/Btn/toggleBtn";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AppleAuthentication from "expo-apple-authentication";
import LoseModal from "../../components/Modal/battle/lose";
import LeaveMsg from "../../components/Modal/myPage/leaveMsg";
import * as Linking from "expo-linking";
import apiClient from "../../api/apiClient";
import { proxyUrl } from "../../constant/common";
const { width } = Dimensions.get("window");
const isLargeScreen = width > 375;

const getDeviceToken = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("알림을 허용할 수 없습니다.");
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
};

const MyPage = () => {
  const url = proxyUrl;
  const navigation = useNavigation();
  const handleTabClick = (tab) => {
    navigation.navigate("MyInfo", { activeTab: tab });
  };
  const [profile, setProfile] = useState([]);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [alarmDataVal, setAlarmDataVal] = useState(true);

  const openSettings = () => {
    if (Platform.OS === "ios") {
      // iOS : 앱 설정 화면으로 직접 이동
      Linking.openURL("app-settings:");
    } else {
      // Android : 시스템 설정 화면
      Linking.openSettings();
    }
  };

  const handleConfirm = () => {
    handleAppleCode();
    // leaveData();
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const openProfile = () => {
    setIsOpenProfile(!isOpenProfile);
  };

  // 프로필 정보
  const fetchData = async () => {
    const inputURL = `/users`;
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      const profileData = response.data;
      setProfile([profileData]);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 로그아웃
  const logoutData = async () => {
    const logout_url = `${url}/apple/auth/logout`;
    const accessToken = await AsyncStorage.getItem("access_token");
    const refreshToken = await AsyncStorage.getItem("refresh_token");

    const bodyData = {
      access_token: accessToken,
      refresh_token: refreshToken,
    };

    try {
      const response = await apiClient.post(logout_url, bodyData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      console.log(response.data);
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("refresh_token");
      if (response.data.status === 200) {
        navigation.replace("KakaoScreen", { screen: "Login" });
        // navigation.navigate("KakaoScreen", { screen: "Login" });
        Alert.alert("", "로그아웃 되었습니다.");
      }
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류: logout", error.response.data);
        Alert.alert("error", "서버에 장애가 발생하였습니다.");
      } else {
        console.error("에러:", error);
        Alert.alert("error", "서버에 장애가 발생하였습니다.");
      }
    }
  };

  // 알림 설정
  const alarmData = async () => {
    const inputURL = `/alarm/permission`;
    const device_token = await getDeviceToken();
    console.log("device_token ::: ", device_token);
    if (!device_token) {
      console.error("디바이스 토큰을 가져오지 못했습니다.");
      return;
    }

    const bodyData = {
      allow: isEnabled,
      target_token: device_token,
    };

    try {
      const response = await apiClient.post(inputURL, bodyData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      alarmFetchData();
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const toggleSwitch = async () => {
    setIsEnabled(!isEnabled);
    await alarmData();
  };

  // 알림 허용 여부
  const alarmFetchData = async () => {
    const inputURL = `/alarm/permission/allow`;
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      const alarmPermission = response.data.data;
      setAlarmDataVal(alarmPermission);
      console.log("alarmPermission", alarmPermission);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    alarmFetchData();
  }, []);

  // apple authorizationCode 발급
  async function handleAppleCode() {
    try {
      const credential = await AppleAuthentication.refreshAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (credential.authorizationCode) {
        // 서버로 인증 코드 전송
        leaveData(credential.authorizationCode);
        // console.log(credential.authorizationCode);
      }
      // 서버로 인증 코드 전송 및 사용자 정보 처리 로직 구현
    } catch (e) {
      if (e.code === "ERR_CANCELED") {
        showAlert({
          title: "탈퇴에 실패했습니다.",
          content: "잠시 후 다시 시도하세요.",
          buttons: [
            {
              text: "확인",
              color: "black",
              onPress: (id) => closeAlert(id),
            },
          ],
        });
      } else {
        console.error("Apple 코드 오류:", e);
      }
    }
  }

  // 회원 탈퇴
  const leaveData = async (authorizationCode) => {
    const secession_url = `${url}/apple/auth/leave`;
    try {
      const response = await apiClient.get(secession_url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        params: { code: authorizationCode },
      });
      console.log("데이터:", response.data);
      if (response.data.status === 200) {
        Alert.alert("회원 탈퇴", "탈퇴 되었습니다.");
        navigation.replace("KakaoScreen", { screen: "Login" });
        // navigation.navigate("KakaoScreen", { screen: "Login" });
      } else {
        Alert.alert(
          "error",
          `탈퇴 중 에러가 발생했습니다.\n관리자에게 문의 바랍니다.`
        );
      }
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류: leave", error.response.data);
        Alert.alert("error", "서버에 장애가 발생하였습니다.");
      } else {
        console.error("에러:", error);
      }
    }
  };

  const handleTermsClick = () => {
    navigation.navigate("Terms", {
      screen: "Terms",
    });
  };

  const handleLogoutClick = () => {
    Alert.alert(
      "",
      "로그아웃 하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: () => {
            logoutData();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleLeaveClick = () => {
    setModalVisible(true);
  };

  const handleTestClick = () => {
    navigation.navigate("MainScreen", { screen: "TestScreen" });
  };

  const handleBlockedClick = () => {
    navigation.navigate("MainScreen", { screen: "BlockedListScreen" });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: isLargeScreen ? 100 : 80 }}>
        <View style={styles.contentContainer}>
          {profile.map((item) => (
            <View
              style={{
                flexDirection: "row",
                marginTop: isLargeScreen ? 24 : 20,
                marginBottom: isLargeScreen ? 16 : 14,
                paddingLeft: 20,
                gap: isLargeScreen ? 24 : 20,
              }}
              key={item.id}
            >
              <Image
                source={{ uri: item.profile }}
                style={{
                  width: isLargeScreen ? 56 : 46,
                  height: isLargeScreen ? 56 : 46,
                  borderRadius: 50,
                }}
              />
              <View style={{ gap: 8 }}>
                <Text style={styles.name}>{item.name}</Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() =>
                    navigation.navigate("SettingProfile", {
                      screen: "SettingProfile",
                    })
                  }
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.setting}>프로필 설정</Text>
                    <Image
                      source={require("../../assets/myPage_setting.png")}
                      style={{ width: 16, height: 16, padding: 2, top: 2 }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <Text style={styles.title}>커뮤니티</Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => handleTabClick("scrap")}
          >
            <Text style={styles.description}>
              스크랩, 작성 글, 작성 댓글 보기
            </Text>
          </TouchableOpacity>
          <Line color={"#C1C1C1"} h={1} />
          <TouchableOpacity activeOpacity={0.6} onPress={handleBlockedClick}>
            <Text style={styles.description}>차단 관리</Text>
          </TouchableOpacity>
          {/* <Line color={"#C1C1C1"} h={1} />
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => handleTabClick("write")}
          >
            <Text style={styles.description}>작성글</Text>
          </TouchableOpacity>
          <Line color={"#C1C1C1"} h={1} />
          */}
          <Line color={"#C1C1C1"} h={4} />
          <Text style={styles.alarmTitle}>알림</Text>
          {/* <TouchableOpacity onPress={openSettings}> */}
          <View style={styles.section}>
            <View style={styles.alarmSection}>
              <Text style={styles.alarmDescription}>서비스 알림 설정</Text>
              <Text style={styles.alarmSubDescription}>
                커뮤니티, 대결, 대화, 친구 신청에 대한 전체 알림 설정
              </Text>
            </View>
            {/* <Image
                source={require("../../assets/alarmArrow.png")}
                style={{ height: 24, width: 24, top: 12 }}
              /> */}
            <ToggleBtn isEnabled={alarmDataVal} toggleSwitch={toggleSwitch} />
          </View>
          {/* </TouchableOpacity> */}
          <Line color={"#C1C1C1"} h={4} />
          <Text style={styles.title}>기타</Text>
          <TouchableOpacity activeOpacity={1} onPress={handleTermsClick}>
            <Text style={styles.description}>이용 약관</Text>
          </TouchableOpacity>
          <Line color={"#C1C1C1"} h={1} />
          <TouchableOpacity activeOpacity={1} onPress={handleLogoutClick}>
            <Text style={styles.description}>로그아웃</Text>
          </TouchableOpacity>
          <Line color={"#C1C1C1"} h={1} />
          <TouchableOpacity activeOpacity={1} onPress={handleLeaveClick}>
            <Text style={styles.description}>회원 탈퇴</Text>
          </TouchableOpacity>
          <Line color={"#C1C1C1"} h={1} />
          {/* 테스트 */}
          {/* <TouchableOpacity activeOpacity={1} onPress={handleTestClick}>
            <Text style={styles.description}>테스트용</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
      <LoseModal isOpenProfile={isOpenProfile} openProfile={openProfile} />
      <LeaveMsg
        isVisible={modalVisible}
        toggleModal={() => setModalVisible(!modalVisible)}
        onDelete={handleConfirm}
        onCancel={handleCancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  contentContainer: {},
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 24,
    marginTop: 17,
    marginBottom: 18,
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: "center",
    marginTop: isLargeScreen ? 12 : 10,
  },
  name: {
    fontSize: isLargeScreen ? 20 : 16,
    color: "#1F1F1F",
    fontFamily: "SUITE_ExtraBold",
  },
  setting: {
    fontSize: isLargeScreen ? 16 : 14,
    color: "#5C5C5C",
    fontFamily: "SUITE_Medium",
  },
  title: {
    fontFamily: "SUITE_ExtraBold",
    fontSize: isLargeScreen ? 16 : 14,
    color: "#1F1F1F",
    paddingLeft: 20,
    paddingTop: isLargeScreen ? 16 : 12,
    marginBottom: isLargeScreen ? 8 : 6,
  },
  description: {
    fontFamily: "SUITE_Medium",
    fontSize: isLargeScreen ? 16 : 14,
    color: "#1F1F1F",
    paddingBottom: isLargeScreen ? 16 : 12,
    paddingTop: isLargeScreen ? 16 : 12,
    paddingLeft: 20,
  },
  alarmTitle: {
    fontSize: isLargeScreen ? 16 : 14,
    color: "#1F1F1F",
    fontFamily: "SUITE_ExtraBold",
    paddingLeft: 20,
    paddingTop: isLargeScreen ? 16 : 12,
    marginBottom: isLargeScreen ? 8 : 6,
  },
  alarmDescription: {
    fontSize: isLargeScreen ? 16 : 14,
    color: "#1F1F1F",
    fontFamily: "SUITE_Medium",
  },
  alarmSubDescription: {
    fontSize: isLargeScreen ? 12 : 10,
    color: "#5C5C5C",
    fontFamily: "SUITE_Medium",
  },
  alarmSection: {
    flexDirection: "column",
    gap: 8,
  },
});

export default MyPage;
