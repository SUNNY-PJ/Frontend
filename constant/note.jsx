import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Input from "../components/Input/input";
import LargeBtnBasic from "../components/Btn/largeBtnBasic";
import axios from "axios";
import { ACCESS_TOKEN } from "./AccessToken";
import Notice from "../components/Modal/notice";
import LoserModal from "../components/Modal/loserModal";

function Note({ navigation }) {
  const proxyUrl = "http://43.201.176.22:8080";
  const endpoint = "/api​/v1​/compettion ";

  const inputURL = "/api/v1/compettion";
  const cleanedURL = inputURL.replace(/[\u200B]/g, "");

  const url = proxyUrl + cleanedURL;
  console.log("url:::", url);

  const [isOpenNoticeMsg, setIsOpenNoticeMsg] = useState(false);

  const openNoticeMsg = () => {
    setIsOpenNoticeMsg(!isOpenNoticeMsg);
  };

  // const fetchData = async () => {
  //   console.log("api 실행");
  //   try {
  //     const response = await axios.get(url, {
  //       headers: {
  //         "Content-Type": "application/json; charset=utf-8",
  //         Authorization: `Bearer ${AccessToken}`,
  //       },
  //     });
  //     console.log("데이터:", response.data);
  //   } catch (error) {
  //     console.error("에러:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      console.log("url:::", url);

      console.log("데이터:", response.data);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const postData = async () => {
    console.log("post 실행");
    try {
      const bodyData = {
        compensation: "string",
        end_date: "2023-09-24",
        friends_id: 2,
        message: "string",
        price: 0,
        start_date: "2023-09-24",
      };

      const response = await axios.post(url, bodyData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          // "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      console.log("url:::::::", url);
      console.log(response);
      //   const data = await response.json();
      console.log("데이터:", response.data);
      console.log("status::", response.data.status);
      console.log("message::", response.data.message);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const handlePostApiTestStart = () => {
    postData();
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>지출 내역 추가</Text>
        <Text style={styles.label}>어떤 이름으로 기록할까요?</Text>
        <Input placeholder={"지출 내용"} />
        <View>
          {isOpenNoticeMsg && <Notice openNoticeMsg={openNoticeMsg} />}
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>어디에 쓰셨나요?</Text>
          <TouchableOpacity activeOpacity={1} onPress={openNoticeMsg}>
            {/* <TouchableOpacity activeOpacity={0.6} onPress={openLoserModal}> */}
            <View style={styles.noticeContainer}>
              <Image
                source={require("../assets/notice.png")}
                style={styles.noticeIcon}
              />
              <Text style={styles.noticeText}>구분 기준</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <View style={styles.radioContainer}>
            <Image
              source={require("../assets/RadioBtnF.png")}
              style={styles.radioIcon}
            />
            <Text style={styles.radioText}>의류</Text>
          </View>
          <View style={styles.radioContainer}>
            <Image
              source={require("../assets/RadioBtnF.png")}
              style={styles.radioIcon}
            />
            <Text style={styles.radioText}>식생활</Text>
          </View>
          <View style={styles.radioContainer}>
            <Image
              source={require("../assets/RadioBtnF.png")}
              style={styles.radioIcon}
            />
            <Text style={styles.radioText}>주거</Text>
          </View>
          <View style={styles.radioContainer}>
            <Image
              source={require("../assets/RadioBtnF.png")}
              style={styles.radioIcon}
            />
            <Text style={styles.radioText}>기타</Text>
          </View>
        </View>
        <Text style={styles.label}>얼마를 쓰셨나요?</Text>
        <Input placeholder={"지출 금액"} />
        <Text style={styles.label}>언제 쓰셨나요?</Text>
        <Input placeholder={"지출 일자"} />
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity onPress={handlePostApiTestStart}> */}
          <LargeBtnBasic text={"등록하기"} onClick={handlePostApiTestStart} />
          {/* </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  contentContainer: {
    marginTop: 25,
    marginBottom: 40,
    paddingLeft: 28,
    paddingRight: 27,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F1F1F",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F1F1F",
    marginBottom: 8,
    marginTop: 32,
    paddingLeft: 10,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 8,
  },
  noticeContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    top: 17,
  },
  noticeIcon: {
    width: 16,
    height: 16,
    marginLeft: 8,
    marginBottom: 9,
    marginRight: 2,
  },
  noticeText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#5C5C5C",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radioText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#5C5C5C",
  },
  radioIcon: {
    width: 24,
    height: 24,
  },
  buttonContainer: {
    marginTop: 40,
  },
});

export default Note;
