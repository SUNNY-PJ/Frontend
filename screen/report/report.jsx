import axios from "axios";
import React, { useState, useEffect } from "react";
import { proxyUrl } from "../../constant/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import InputMax from "../../components/Input/inputMax";
import LargeBtn from "../../components/Btn/largeBtn";
import LargeBtnDisable from "../../components/Btn/largeBtnDisable";
import Line from "../../components/Line";

const Report = () => {
  const [content, setContent] = useState("");
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);

  const handleContentChange = (text) => {
    setContent(text);
  };

  const postData = async () => {
    const inputURL = "/users/report";
    const cleanedURL = inputURL.replace(/[\u200B]/g, "");

    const url = proxyUrl + cleanedURL;
    const access_token = await AsyncStorage.getItem("access_token");
    console.log(access_token);
    try {
      const bodyData = {
        id: 0,
        reason: comment,
        status: "COMMENT",
      };
      const response = await axios.post(url, bodyData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.status === 200) {
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
    postData();
  };

  const handleCloseClick = () => {};

  useEffect(() => {
    setIsAllFieldsFilled(content);
  }, [content]);

  return (
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
          게시글/댓글/답글 작성자 닉네임
        </Text>
        <Text style={[styles.mainText]}>내용</Text>
        <Text style={[styles.text, { marginBottom: 18 }]}>
          게시글/댓글/답글 내용
        </Text>
      </View>
      <Line h={4} color={"#C1C1C1"} />
      <View style={{ paddingRight: 20, paddingLeft: 20 }}>
        <Text style={[styles.mainText, { marginTop: 18 }]}>신고 사유</Text>
        <InputMax
          placeholder={"내용 (최대 300자)"}
          inputValue={content}
          handleInputChange={handleContentChange}
        />
        <View style={{ height: 50 }} />
        {isAllFieldsFilled ? (
          <LargeBtn text={"접수하기"} onClick={handleSubmitClick} />
        ) : (
          <LargeBtnDisable text={"접수하기"} />
        )}
      </View>
    </View>
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
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
    color: "#1F1F1F",
  },
});

export default Report;
