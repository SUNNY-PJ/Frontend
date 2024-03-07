import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import MiddleBtn from "../../Btn/middleBtn";
import MiddleBtnBlack from "../../Btn/middleBtnBlack";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { proxyUrl } from "../../constant/common";

const MatchMsg = ({ isVisible, toggleModal, friendsId }) => {
  const inputURL = `/competition/approve/${friendsId}`;
  const url = proxyUrl + inputURL;

  // 대결 신청 수락
  const approveMatch = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log(response.data);
      if (response.status === 200) {
        if (response.data.status === 400) {
          Alert.alert(
            "Error",
            `서버 장애가 발생했습니다.\n관리자에게 문의 바랍니다.`
          );
        } else {
          Alert.alert("대결 수락", `대결 신청을 수락했습니다.`);
          // navigation.navigate("MainScreen", { screen: "FriendsList" });
        }
      }
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류:", error.response.data);
        console.error("서버 응답 메세지:", error.message);
      } else {
        console.error("에러:", error);
      }
    }
  };

  // 대결 신청 거절
  const refuseMatch = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      const response = await axios.delete(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log(response.data);
      if (response.status === 200) {
        if (response.data.status === 400) {
          Alert.alert(
            "Error",
            `서버 장애가 발생했습니다.\n관리자에게 문의 바랍니다.`
          );
        } else {
          Alert.alert("대결 거절", `대결 신청을 거절했습니다.`);
          // navigation.navigate("MainScreen", { screen: "FriendsList" });
        }
      }
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류:", error.response.data);
        console.error("서버 응답 메세지:", error.message);
      } else {
        console.error("에러:", error);
      }
    }
  };

  const handleApprove = () => {
    approveMatch();
  };

  const handleRefuse = () => {
    refuseMatch();
  };

  return (
    <Modal animationType="none" transparent={true} visible={isVisible}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          height: "100%",
        }}
      >
        <View style={styles.container}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity onPress={toggleModal}>
              <Image
                source={require("../../assets/close.png")}
                style={{ width: 16, height: 16 }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>
            @@님에게서
            {"\n"}대결 신청이 왔어요!
          </Text>
          <View style={styles.textContainer}>
            <View style={styles.textRow}>
              <Text style={styles.textLabel}>도발 메세지</Text>
              <Text style={styles.textValue}>도발 메세지</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textLabel}>대결 보상</Text>
              <Text style={styles.textValue}>맘스터치 기프티콘</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textLabel}>대결 기간/금액</Text>
              <Text style={styles.textValue}>7일</Text>
              <Text style={styles.textValue}>150,000원</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleRefuse}>
              <MiddleBtn text={"거절"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleApprove}>
              <MiddleBtnBlack text={"승낙"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 335,
    // height: 480,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#1F1F1F",
    backgroundColor: "#fff",
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  closeButtonContainer: {
    alignSelf: "flex-end",
    paddingTop: 16,
    paddingRight: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
    color: "#000",
    fontFamily: "SUITE_Bold",
  },
  textContainer: {
    flexDirection: "cloumns",
    gap: 24,
    paddingLeft: 24,
  },
  textRow: {
    flexDirection: "cloumns",
    gap: 8,
  },
  textLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    fontFamily: "SUITE_Bold",
  },
  textValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    fontFamily: "SUITE_Medium",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginTop: 40,
    marginBottom: 39,
  },
});

export default MatchMsg;
