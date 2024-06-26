import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import WebView from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { proxyUrl } from "../constant/common";
import axios from "axios";

const REST_API_KEY = "56e15a4c7aaa857397437034b58c0016";
const REDIRECT_URI = "http://192.168.50.45:19006";
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const Kakao = () => {
  const url = proxyUrl;

  const [showOverlay, setShowOverlay] = useState(true);

  const navigation = useNavigation();

  const kakao_url = `https://kauth.kakao.com/oauth/authorize?client_id=7ff971db2010c97a3e191dd319ec45cd&redirect_uri=${url}/auth/kakao/callback&response_type=code`;

  const handleWebViewMessage = (data) => {
    KakaoLoginWebView(data);
  };

  function KakaoLoginWebView(data) {
    console.log("카카오 로그인 시도:::", data);
    const exp = "code=";
    var condition = data.indexOf(exp);
    if (condition != -1) {
      var authorize_code = data.substring(condition + exp.length);
      console.log("코드:::", authorize_code);
      fetchData();
    }
  }

  const fetchData = async () => {
    console.log("카카오 fetch 실행");
    try {
      const response = await axios.get(kakao_url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      // const access_token = response.headers.authorization;
      const access_token = response.data.data.accessToken;
      const refresh_token = response.data.data.refreshToken;
      await AsyncStorage.setItem("access_token", access_token);
      await AsyncStorage.setItem("refresh_token", refresh_token);
      console.log("저장함::", access_token);
      // postData();
      navigation.replace("SignUpScreen", { screen: "SignUp" });
    } catch (error) {
      console.log("errorMessage:::", error);
      if (error.response) {
        console.error("서버 응답 오류: kakao login", error.response);
      } else {
        console.error("에러:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        scalesPageToFit={false}
        source={{
          uri: kakao_url,
        }}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: "#fff",
    zIndex: 100,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#fff",
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
