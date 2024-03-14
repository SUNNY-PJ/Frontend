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
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { proxyUrl } from "../../constant/common";
import LoseModal from "../../components/Modal/battle/lose";
import LeaveMsg from "../../components/Modal/myPage/leaveMsg";
import ToggleBtn from "../../components/Btn/toggleBtn";
import apiClient from "../../api/apiClient";

const MyPage = () => {
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();
  const handleTabClick = (tab) => {
    navigation.navigate("MyInfo", { activeTab: tab });
  };
  const [profile, setProfile] = useState([]);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [alarmDataVal, setAlarmDataVal] = useState(true);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    alarmData();
  };

  const handleConfirm = () => {
    leaveData();
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

      console.log("프로필 정보:::", response.data);
      const profileData = response.data;
      setProfile([profileData]);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  // 알림 설정
  const alarmData = async () => {
    const inputURL = `/alarm/permission`;
    const device_token = await AsyncStorage.getItem("device_token");
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
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
      alarmFetchData();
    });

    return unsubscribe;
  }, [navigation]);

  // 로그아웃
  const logoutData = async () => {
    // const lououtUrl = "http://43.201.176.22:8080/mypage/auth/kakao/logout";
    const inputURL = "/auth/kakao/logout";
    try {
      // const params = {
      //   client_id: "7ff971db2010c97a3e191dd319ec45cd",
      //   logout_redirect_uri: lououtUrl,
      // };
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      console.log("데이터:", response.headers);
      alert("로그아웃 되었습니다.");

      navigation.navigate("KakaoScreen", { screen: "Login" });
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류:", error.response.data);
        console.error("서버 응답 메세지:", error.message);
        alert(error.message);
      } else {
        console.error("에러:", error);
      }
    }
  };

  // 회원 탈퇴
  const leaveData = async () => {
    const inputURL = "/auth/leave";
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      console.log("데이터:", response.data);
      alert("탈퇴 되었습니다.");
      navigation.navigate("KakaoScreen", { screen: "Login" });
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류:", error.response.data);
        console.error("서버 응답 메세지:", error.message);
        alert(error.message);
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
      "로그아웃",
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
    // navigation.navigate("MainScreen", { screen: "BattleStatus" });
    navigation.navigate("KakaoScreen", { screen: "AppleLogin" });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ height: windowHeight - 125 - 88 }}>
        <View style={styles.contentContainer}>
          {profile.map((item) => (
            <View
              style={{
                flexDirection: "row",
                marginTop: 24,
                marginBottom: 16,
                paddingLeft: 20,
                gap: 24,
              }}
              key={item.id}
            >
              <Image
                // source={require("../../assets/myPage_profile.png")}
                source={{ uri: item.profile }}
                style={{ width: 56, height: 56, borderRadius: 50 }}
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
          {/* <Line color={"#C1C1C1"} h={4} /> */}
          <Text style={styles.title}>커뮤니티</Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => handleTabClick("scrap")}
          >
            <Text style={styles.description}>
              스크랩, 작성글, 작성 댓글 보기
            </Text>
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
          <View style={styles.section}>
            <View style={styles.alarmSection}>
              <Text style={styles.alarmDescription}>서비스 알림 설정</Text>
              <Text style={styles.alarmSubDescription}>
                커뮤니티, 대결, 대화, 친구 신청에 대한 전체 알림 설정
              </Text>
            </View>
            <ToggleBtn isEnabled={alarmDataVal} toggleSwitch={toggleSwitch} />
          </View>
          {/* <TouchableOpacity
            activeOpacity={0.6}
            onPress={handldSettingAlarmClick}
          >
            <Text style={styles.description}>알림 설정</Text>
          </TouchableOpacity> */}
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
          <TouchableOpacity activeOpacity={1} onPress={handleTestClick}>
            <Text style={styles.description}>테스트용</Text>
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 80,
            marginTop: 16,
          }}
        >
            <Image
              source={require("../../assets/myPage_notice.png")}
              style={{ width: 56, height: 84 }}
            />
          <Image
            source={require("../../assets/myPage_center.png")}
            style={{ width: 56, height: 84 }}
          />
        </View> */}
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
    marginTop: 12,
  },
  name: { fontSize: 20, color: "#1F1F1F", fontFamily: "SUITE_ExtraBold" },
  setting: {
    fontSize: 16,
    color: "#5C5C5C",
    fontFamily: "SUITE_Medium",
  },
  title: {
    fontFamily: "SUITE_ExtraBold",
    fontSize: 16,
    color: "#1F1F1F",
    paddingLeft: 20,
    paddingTop: 16,
    marginBottom: 8,
  },
  description: {
    fontFamily: "SUITE_Medium",
    fontSize: 16,
    color: "#1F1F1F",
    paddingBottom: 16,
    paddingTop: 16,
    paddingLeft: 20,
  },
  alarmTitle: {
    fontSize: 16,
    color: "#1F1F1F",
    fontFamily: "SUITE_ExtraBold",
    paddingLeft: 20,
    paddingTop: 16,
    marginBottom: 8,
  },
  alarmDescription: {
    fontSize: 16,
    color: "#1F1F1F",
    fontFamily: "SUITE_Medium",
  },
  alarmSubDescription: {
    fontSize: 12,
    color: "#5C5C5C",
    fontFamily: "SUITE_Medium",
  },
  alarmSection: {
    flexDirection: "column",
    gap: 8,
  },
});

export default MyPage;
