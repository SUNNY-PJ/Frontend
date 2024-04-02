import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import InputMax from "../../components/Input/inputMax";
import LargeBtn from "../../components/Btn/largeBtn";
import LargeBtnDisable from "../../components/Btn/largeBtnDisable";
import Line from "../../components/Line";
import ReportResult from "../../components/Modal/report/reportResult";
import ReportMsg from "../../components/Modal/report/reportMsg";
import apiClient from "../../api/apiClient";
import { useNavigation } from "@react-navigation/native";

const Report = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { itemId } = route.params;
  const { reportType } = route.params;
  const { writer } = route.params;
  const { content } = route.params;
  const [reason, setReason] = useState("");
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);
  const [result, setResult] = useState(false);
  const [msg, setMsg] = useState(false);

  const handleReasonChange = (text) => {
    setReason(text);
  };

  const postData = async () => {
    const inputURL = "/users/report";
    try {
      const bodyData = {
        id: itemId,
        reason: reason,
        reportType: reportType,
      };
      const response = await apiClient.post(inputURL, bodyData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      console.log("신고 제출::::");
      console.log(bodyData);
      console.log(response.data);
      if (response.status === 200) {
        Alert.alert("신고", "신고를 정상적으로 처리했습니다.");
        navigation.goBack();
      } else {
        Alert.alert(
          "error",
          `장애가 발생했습니다.\n 잠시후 다시 시도해주세요.`
        );
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

  const handleSubmitClick = () => {
    setMsg(true);
  };

  const handleSubmitAgreeClick = () => {
    setMsg(false);
    postData();
  };

  const handleCloseClick = () => {
    // setMsg(false);
    // setResult(false);
    navigation.goBack();
  };

  useEffect(() => {
    setIsAllFieldsFilled(reason);
  }, [reason]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={{ alignSelf: "center" }}>
            <Text style={[styles.mainText]}>신고하기</Text>
          </View>
          <TouchableOpacity activeOpacity={1} onPress={handleCloseClick}>
            <Image
              source={require("../../assets/close.png")}
              style={{
                width: 16,
                height: 16,
                alignSelf: "flex-end",
                bottom: 25,
              }}
              onPress={() => {}}
            />
          </TouchableOpacity>
          <Text style={[styles.mainText]}>작성자</Text>
          <Text style={[styles.text, { marginBottom: 20 }]}>
            {/* 게시글/댓글/답글 작성자 닉네임 */}
            {writer}
          </Text>
          <Text style={[styles.mainText]}>내용</Text>

          <Text
            style={[styles.text, { marginBottom: 18 }]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {/* 게시글/댓글/답글 내용 */}
            {content}
          </Text>
        </View>
        <Line h={4} color={"#C1C1C1"} />
        <View style={{ paddingRight: 20, paddingLeft: 20 }}>
          <Text style={[styles.mainText, { marginTop: 18 }]}>신고 사유</Text>
          <InputMax
            placeholder={"내용 (최대 300자)"}
            inputValue={reason}
            handleInputChange={handleReasonChange}
          />
          <View style={{ height: 50 }} />
          {isAllFieldsFilled ? (
            <LargeBtn text={"접수하기"} onClick={handleSubmitClick} />
          ) : (
            <LargeBtnDisable text={"접수하기"} />
          )}
        </View>
        <ReportMsg
          isVisible={msg}
          onSubmit={handleSubmitAgreeClick}
          onCancel={() => setMsg(false)}
        />
        <ReportResult
          isVisible={result}
          onCancel={() => setResult(false)}
          result={"good"}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  section: {
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 16,
  },
  mainText: {
    fontSize: 16,
    fontWeight: 700,
    color: "#1F1F1F",
    fontFamily: "SUITE_Bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
    color: "#1F1F1F",
    fontFamily: "SUITE",
  },
});

export default Report;
