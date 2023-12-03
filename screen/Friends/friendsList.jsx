import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { proxyUrl } from "../../constant/common";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import RefuseMsg from "../../components/Modal/refuseMsg";
import WinnerModal from "../../components/Modal/winnerModal";
import LoserModal from "../../components/Modal/loserModal";
import MatchMsg from "../../components/Modal/matchMsg";
import ErrorModal from "../../components/Modal/errorModal";
import ConsentMsg from "../../components/Modal/consentMsg";
// import MatchSendMsg from "../../components/Modal/matchSendMsg";
import Line from "../../components/Line";
import NoticeModal from "../../components/Modal/noticeModal";
import GoalMsg from "../../components/Modal/goal/goalMsg";
import Goal30Msg from "../../components/Modal/goal/goal30Msg";
import Goal60Msg from "../../components/Modal/goal/goal60Msg";
import Goal80Msg from "../../components/Modal/goal/goal80Msg";
import FriendsMsg from "../../components/Modal/friendsMsg";

function FriendsList() {
  const navigation = useNavigation();
  const inputURL = "/api/v1/friends";
  const cleanedURL = inputURL.replace(/[\u200B]/g, "");

  const url = proxyUrl + inputURL;

  const [isModalVisible, setModalVisible] = useState(false);
  const [isOpenRefuseMessage, setIsOpenRefuseMessage] = useState(false);
  const [isOpenConsentMessage, setIsOpenConsentMessage] = useState(false);
  const [isOpenWinnerModal, setIsOpenWinnerModal] = useState(false);
  const [isOpenLoserModal, setIsOpenLoserModal] = useState(false);
  // const [isMatchModal, setIsMatchModal] = useState(false);
  const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);
  const [isOpenNoticeModal, setIsOpenNoticeModal] = useState(false);
  const [isOpenGoalMessage, setIsOpenGoalMessage] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const openRefuseMessage = () => {
    setIsOpenRefuseMessage(!isOpenRefuseMessage);
  };

  const openConsentMessage = () => {
    setIsOpenConsentMessage(!isOpenConsentMessage);
  };

  const openWinnerModal = () => {
    setIsOpenWinnerModal(!isOpenWinnerModal);
  };

  const openLoserModal = () => {
    setIsOpenLoserModal(!isOpenLoserModal);
  };

  const goalModal = () => {
    setIsOpenGoalMessage(!isOpenGoalMessage);
  };

  const openErrorModal = () => {
    setIsOpenErrorModal(!isOpenErrorModal);
  };

  const openNoticeModal = () => {
    setIsOpenNoticeModal(!isOpenNoticeModal);
  };

  const fetchData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    console.log(access_token);
    console.log("get 실행");

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log("데이터:", response.data);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("실행된건가");
  }, []);

  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "#FFFBF6",
        minHeight: "100%",
      }}
    >
      <View
        style={{
          // flex: 1,
          flexDirection: "column",
          marginTop: 25,
          marginBottom: 40,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#1F1F1F",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          친구 목록
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#1F1F1F",
            paddingLeft: 28,
            marginBottom: 8,
          }}
        >
          대결중인 친구
        </Text>
        <Line color={"#C1C1C1"} h={2} />
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 28,
              paddingRight: 28,
              marginBottom: 20,
              paddingTop: 20,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  navigation.navigate("FriendProfile", {
                    screen: "FriendProfile",
                  })
                }
              >
                <Image
                  source={require("../../assets/Avatar.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#1F1F1F",
                  alignSelf: "center",
                }}
              >
                친구1
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <TouchableOpacity activeOpacity={0.6} onPress={toggleModal}>
                <Image
                  source={require("../../assets/messageBlack.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} onPress={openRefuseMessage}>
                <Image
                  source={require("../../assets/VersusIcon.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Line color={"#C1C1C1"} h={2} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 28,
              paddingRight: 28,
              paddingBottom: 20,
              paddingTop: 20,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity activeOpacity={0.6}>
                <Image
                  source={require("../../assets/Avatar.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#1F1F1F",
                  alignSelf: "center",
                }}
              >
                친구2
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <TouchableOpacity activeOpacity={0.6} onPress={openWinnerModal}>
                <Image
                  source={require("../../assets/messageBlack.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} onPress={openLoserModal}>
                <Image
                  source={require("../../assets/VersusIcon.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Line color={"#C1C1C1"} h={2} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 28,
              paddingRight: 28,
              paddingBottom: 20,
              paddingTop: 20,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../../assets/Avatar.png")}
                style={styles.icon}
              />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#1F1F1F",
                  alignSelf: "center",
                }}
              >
                친구3
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <TouchableOpacity activeOpacity={0.6} onPress={goalModal}>
                <Image
                  source={require("../../assets/messageBlack.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={openConsentMessage}
              >
                <Image
                  source={require("../../assets/VersusIconRed.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Line color={"#C1C1C1"} h={2} />
      </View>
      {/* 친구 목록 */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: "#1F1F1F",
          paddingLeft: 28,
          marginBottom: 8,
        }}
      >
        친구
      </Text>
      <Line color={"#C1C1C1"} h={2} />
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 28,
            paddingRight: 28,
            marginBottom: 20,
            marginTop: 20,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../assets/Avatar.png")}
              style={styles.icon}
            />
            <Text
              style={{
                marginLeft: 8,
                fontSize: 16,
                fontWeight: 500,
                color: "#1F1F1F",
                alignSelf: "center",
              }}
            >
              친구1
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <TouchableOpacity activeOpacity={0.6} onPress={openErrorModal}>
              <Image
                source={require("../../assets/messageBlack.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={openNoticeModal}>
              <Image
                source={require("../../assets/VersusIconBlack.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Line color={"#C1C1C1"} h={2} />
      </ScrollView>
      {/* <MatchMsg isVisible={isModalVisible} toggleModal={toggleModal} /> */}
      <FriendsMsg isVisible={isModalVisible} toggleModal={toggleModal} />
      <RefuseMsg
        isOpenRefuseMessage={isOpenRefuseMessage}
        openRefuseMessage={openRefuseMessage}
      />
      <ConsentMsg
        isOpenConsentMessage={isOpenConsentMessage}
        openConsentMessage={openConsentMessage}
      />
      <WinnerModal
        isOpenWinnerModal={isOpenWinnerModal}
        openWinnerModal={openWinnerModal}
      />
      <LoserModal
        isOpenLoserModal={isOpenLoserModal}
        openLoserModal={openLoserModal}
      />
      {/* <MatchSendMsg isMatchModal={isMatchModal} matchModal={matchModal} /> */}
      <GoalMsg
        isOpenGoalMessage={isOpenGoalMessage}
        openGoalMessage={goalModal}
      />
      {/* <Goal30Msg
        isOpenGoalMessage={isOpenGoalMessage}
        openGoalMessage={goalModal}
      /> */}
      <ErrorModal
        isOpenErrorModal={isOpenErrorModal}
        openErrorModal={openErrorModal}
      />
      <NoticeModal
        isOpenNoticeModal={isOpenNoticeModal}
        openNoticeModal={openNoticeModal}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  menuItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 40,
    width: 40,
  },
});

export default FriendsList;
