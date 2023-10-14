import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import RefuseMsg from "../components/Modal/refuseMsg";
import WinnerModal from "../components/Modal/winnerModal";
import LoserModal from "../components/Modal/loserModal";
import MatchMsg from "../components/Modal/matchMsg";
import ErrorModal from "../components/Modal/errorModal";
import ConsentMsg from "../components/Modal/consentMsg";
import MatchSendMsg from "../components/Modal/matchSendMsg";
import Line from "../components/Line";

function FriendsList({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isOpenRefuseMessage, setIsOpenRefuseMessage] = useState(false);
  const [isOpenConsentMessage, setIsOpenConsentMessage] = useState(false);
  const [isOpenWinnerModal, setIsOpenWinnerModal] = useState(false);
  const [isOpenLoserModal, setIsOpenLoserModal] = useState(false);
  const [isMatchModal, setIsMatchModal] = useState(false);
  const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);

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

  const matchModal = () => {
    setIsMatchModal(!isMatchModal);
  };

  const openErrorModal = () => {
    setIsOpenErrorModal(!isOpenErrorModal);
  };

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
              <Image
                source={require("../assets/Avatar.png")}
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
              <TouchableOpacity activeOpacity={0.6} onPress={toggleModal}>
                <Image
                  source={require("../assets/messageBlack.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} onPress={openRefuseMessage}>
                <Image
                  source={require("../assets/VersusIcon.png")}
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
                source={require("../assets/Avatar.png")}
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
                친구2
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <TouchableOpacity activeOpacity={0.6} onPress={openWinnerModal}>
                <Image
                  source={require("../assets/messageBlack.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} onPress={openLoserModal}>
                <Image
                  source={require("../assets/VersusIcon.png")}
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
                source={require("../assets/Avatar.png")}
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
              <TouchableOpacity activeOpacity={0.6} onPress={matchModal}>
                <Image
                  source={require("../assets/messageBlack.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={openConsentMessage}
              >
                <Image
                  source={require("../assets/VersusIconRed.png")}
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
              source={require("../assets/Avatar.png")}
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
                source={require("../assets/messageBlack.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../assets/VersusIconBlack.png")}
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
              source={require("../assets/Avatar.png")}
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
              친구2
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <TouchableOpacity>
              <Image
                source={require("../assets/messageBlack.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../assets/VersusIconBlack.png")}
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
              source={require("../assets/Avatar.png")}
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
            <TouchableOpacity>
              <Image
                source={require("../assets/messageBlack.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../assets/VersusIconBlack.png")}
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
              source={require("../assets/Avatar.png")}
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
            <TouchableOpacity>
              <Image
                source={require("../assets/messageBlack.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../assets/VersusIconBlack.png")}
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
              source={require("../assets/Avatar.png")}
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
            <TouchableOpacity>
              <Image
                source={require("../assets/messageBlack.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../assets/VersusIconBlack.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <MatchMsg isVisible={isModalVisible} toggleModal={toggleModal} />
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
      <MatchSendMsg isMatchModal={isMatchModal} matchModal={matchModal} />
      <ErrorModal
        isOpenErrorModal={isOpenErrorModal}
        openErrorModal={openErrorModal}
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
