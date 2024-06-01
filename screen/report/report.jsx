import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
} from "react-native";
import { styles } from "./report.styles";
import { useRoute } from "@react-navigation/native";
import InputMax from "../../components/Input/inputMax";
import LargeBtn from "../../components/Btn/largeBtn";
import LargeBtnDisable from "../../components/Btn/largeBtnDisable";
import Line from "../../components/Line";
import ReportResult from "../../components/Modal/report/reportResult";
import ReportMsg from "../../components/Modal/report/reportMsg";
import apiClient from "../../api/apiClient";
import { useNavigation } from "@react-navigation/native";

const Reason = [
  { id: 0, content: "스팸홍보/도배글입니다." },
  { id: 1, content: "불법 정보를 포함하고 있습니다." },
  { id: 2, content: "음란물입니다." },
  { id: 3, content: "욕설/생명경시/혐오/차별적 표현입니다." },
  { id: 4, content: "개인정보 노출 게시물입니다." },
  { id: 5, content: "불쾌한 표현이 있습니다." },
  { id: 6, content: "기타" },
];

const Report = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { itemId, reportType, writer, content } = route.params;
  const [selectedReason, setSelectedReason] = useState(null);
  const [reasonDetail, setReasonDetail] = useState("");
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);
  const [msg, setMsg] = useState(false);

  const handleReasonSelect = (id) => {
    setSelectedReason(id);
    setReasonDetail("");
    setIsAllFieldsFilled(id !== 6 || reasonDetail.trim() !== "");
  };

  const handleReasonDetailChange = (text) => {
    setReasonDetail(text);
    setIsAllFieldsFilled(selectedReason !== 6 || text.trim() !== "");
  };

  const postData = async () => {
    const inputURL = "/users/report";
    try {
      const bodyData = {
        id: itemId,
        reason:
          selectedReason === 6 ? reasonDetail : Reason[selectedReason].content,
        reportType: reportType,
      };
      const response = await apiClient.post(inputURL, bodyData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      if (response.status === 200) {
        Alert.alert("", "신고를 정상적으로 처리했습니다.");
        navigation.goBack();
      } else {
        Alert.alert(
          "error",
          `장애가 발생했습니다.\n 잠시후 다시 시도해주세요.`
        );
      }
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류: report", error.response.data);
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
    navigation.goBack();
  };

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
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.closeImg}
            />
          </TouchableOpacity>
          <Text style={[styles.mainText]}>작성자</Text>
          <Text style={[styles.text, { marginBottom: 20 }]}>{writer}</Text>
          <Text style={[styles.mainText]}>내용</Text>
          <Text
            style={[styles.text, { marginBottom: 18 }]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {content}
          </Text>
        </View>
        <Line h={4} color={"#C1C1C1"} />
        <ScrollView style={{ marginBottom: 320 }}>
          <View style={{ paddingRight: 20, paddingLeft: 20 }}>
            <Text style={[styles.mainText, { marginTop: 18 }]}>신고 사유</Text>
            <View style={styles.content}>
              {Reason.map((item, index) => (
                <React.Fragment key={item.id}>
                  <TouchableOpacity
                    style={styles.reasonContainer}
                    onPress={() => handleReasonSelect(item.id)}
                  >
                    <Image
                      source={
                        selectedReason === item.id
                          ? require("../../assets/RadioBtnT.png")
                          : require("../../assets/RadioBtnF.png")
                      }
                      style={styles.radioIcon}
                    />
                    <Text style={styles.reasonText}>{item.content}</Text>
                  </TouchableOpacity>
                  {index < Reason.length - 1 && (
                    <Line h={1.5} color={"#C1C1C1"} />
                  )}
                </React.Fragment>
              ))}
            </View>
            {selectedReason === 6 && (
              <>
                <View style={{ height: 8 }} />
                <InputMax
                  placeholder={"내용 (최대 300자)"}
                  inputValue={reasonDetail}
                  handleInputChange={handleReasonDetailChange}
                  height={100}
                />
              </>
            )}
            <View style={{ height: 50 }} />
            {isAllFieldsFilled ? (
              <LargeBtn text={"접수하기"} onClick={handleSubmitClick} />
            ) : (
              <LargeBtnDisable text={"접수하기"} />
            )}
            <View style={{ height: 50 }} />
          </View>
        </ScrollView>
        <ReportMsg
          isVisible={msg}
          onSubmit={handleSubmitAgreeClick}
          onCancel={() => setMsg(false)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Report;
