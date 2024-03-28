import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import MiddleBtn from "../../Btn/middleBtn";
import MiddleBtnBlack from "../../Btn/middleBtnBlack";
import apiClient from "../../../api/apiClient";

const MatchMsg = ({ isVisible, toggleModal, friendsId, nickname }) => {
  const inputURL = `/competition/approve/${friendsId}`;
  const [matchInfo, setMatchInfo] = useState(null);
  // price 포맷 함수
  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  // 대결 확인
  const fetchData = async () => {
    const inputURL = `/competition/${friendsId}`;
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      console.log("대결 신청 조회", response.data);
      if (response.status === 200) {
        if (response.data.status === 400) {
          Alert.alert(
            "Error",
            `서버 장애가 발생했습니다.\n관리자에게 문의 바랍니다.`
          );
        } else {
          setMatchInfo(response.data.data);
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

  useEffect(() => {
    if (isVisible) {
      fetchData();
    }
  }, [isVisible, friendsId]);

  // 대결 신청 수락
  const approveMatch = async () => {
    try {
      const response = await apiClient.post(
        inputURL,
        {},
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
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
          toggleModal();
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
    try {
      const response = await apiClient.delete(
        inputURL,
        {},
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
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
          toggleModal();
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
                source={require("../../../assets/close.png")}
                style={{ width: 16, height: 16 }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>
            {nickname}님에게서
            {"\n"}대결 신청이 왔어요!
          </Text>
          <View style={styles.textContainer}>
            <View style={styles.textRow}>
              <View style={styles.textRow}>
                <Text style={styles.textLabel}>도발 메세지</Text>
                <Text style={styles.textValue}>
                  {matchInfo?.message || "없음"}
                </Text>
              </View>
            </View>
            {/* <View style={styles.textRow}>
              <Text style={styles.textLabel}>대결 보상</Text>
              <Text style={styles.textValue}>맘스터치 기프티콘</Text>
            </View> */}
            <View style={styles.textRow}>
              <Text style={styles.textLabel}>대결 기간/금액</Text>
              <Text style={styles.textValue}>{matchInfo?.period}일</Text>
              <Text style={styles.textValue}>
                {formatPrice(matchInfo?.price || 0)}원
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <MiddleBtn text={"거절"} onClick={handleRefuse} />
            <MiddleBtnBlack text={"승낙"} onClick={handleApprove} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 315,
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
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 30,
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
    fontSize: 16,
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
    marginTop: 32,
    marginBottom: 32,
  },
});

export default MatchMsg;
