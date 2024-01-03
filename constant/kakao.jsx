import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { proxyUrl } from "../constant/common";
import axios from "axios";

const REST_API_KEY = "56e15a4c7aaa857397437034b58c0016";
const REDIRECT_URI = "http://192.168.50.45:19006";
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const Kakao = () => {
  const inputURL = "/alarm/token";
  const url = proxyUrl + inputURL;
  const navigation = useNavigation();

  const kakao_url =
    "https://kauth.kakao.com/oauth/authorize?client_id=7ff971db2010c97a3e191dd319ec45cd&redirect_uri=http://43.201.176.22:8080/auth/kakao/callback&response_type=code";

  // fetchData, postData를 순서대로 호출하는 함수
  const handleWebViewMessage = (data) => {
    KakaoLoginWebView(data);
    fetchData();
    postData();
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(kakao_url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      const access_token = response.data.data.accessToken;
      const refresh_token = response.data.data.refreshToken;
      console.log(access_token);
      await AsyncStorage.setItem("access_token", access_token);
      await AsyncStorage.setItem("refresh_token", refresh_token);

      navigation.navigate("MainScreen", { screen: "SignUp" });
      console.log("데이터:::::", response.data);
    } catch (error) {
      console.log("errorMessage:::", error.message);
      if (error.response) {
        console.error("서버 응답 오류:", error.response);
      } else {
        console.error("에러:", error);
      }
    }
  };

  // 디바이스 토큰 api
  const postData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    const device_token = await AsyncStorage.getItem("device_token");
    try {
      const bodyData = {
        targetToken: device_token,
      };

      const response = await axios.post(url, bodyData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log("디바이스 토큰 api", response.data);

      navigation.navigate("MainScreen", { screen: "FriendsList" });
    } catch (error) {
      console.error("에러:", error);
    }
  };

  function KakaoLoginWebView(data) {
    console.log("카카오 로그인 시도:::");
    const exp = "code=";
    var condition = data.indexOf(exp);
    if (condition != -1) {
      var authorize_code = data.substring(condition + exp.length);
      console.log("코드:::", authorize_code);
    }
  }

  return (
    <View style={Styles.container}>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        scalesPageToFit={false}
        source={{
          uri: kakao_url,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={(event) => {
          handleWebViewMessage(event.nativeEvent["url"]);
        }}
      />
    </View>
  );
};

export default Kakao;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: "#fff",
  },
});
