import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

// const REST_API_KEY = "56e15a4c7aaa857397437034b58c0016";
// const REDIRECT_URI = "http://192.168.50.45:19006";
const REST_API_KEY = "7ff971db2010c97a3e191dd319ec45cd";
const REDIRECT_URI = "http://43.201.176.22:8080/auth/kakao/callback";
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const Kakao = () => {
  // console.log("페이지 진입");
  // const [code, setCode] = useState("");
  // const navigation = useNavigation();

  const kakao_url =
    "https://kauth.kakao.com/oauth/authorize?client_id=7ff971db2010c97a3e191dd319ec45cd&redirect_uri=http://43.201.176.22:8080/auth/kakao/callback&response_type=code";

  // // const kakao_url = `https://kauth.kakao.com/oauth/authorize?client_id=7ff971db2010c97a3e191dd319ec45cd&redirect_uri=http://43.201.176.22:8080/auth/kakao/callback&response_type=${code}`;

  // const fetchData = async () => {
  //   console.log("get 실행");
  //   try {
  //     const response = await axios.get(kakao_url, {
  //       headers: {
  //         "Content-Type": "application/json; charset=utf-8",
  //       },
  //     });
  //     console.log("실행중입니다............");
  //     console.log(kakao_url);
  //     console.log(response);
  //     console.log(response.data);
  //     if (response) {
  //       if (response.data.data) {
  //         const access_token = response.data.data.accessToken;
  //         const refresh_token = response.data.data.refreshToken;

  //         console.log("accessToken:::::", access_token);
  //         storeData(access_token);
  //         storeData(refresh_token);
  //         navigation.navigate("SignUp", { screen: "SignUp" });
  //       }
  //       console.log("데이터:::::", response.data);
  //       // 임시 경로
  //     }
  //   } catch (error) {
  //     console.log("errorMessage:::", error.message);
  //     if (error.response) {
  //       console.error("서버  응답 오류:", error.response);
  //     } else {
  //       console.error("에러:", error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  function KakaoLoginWebView(data) {
    console.log("카카오 로그인 시도:::");
    const exp = "code=";
    var condition = data.indexOf(exp);
    if (condition != -1) {
      var authorize_code = data.substring(condition + exp.length);
      console.log("코드:::", authorize_code);
      // setCode(authorize_code);
    }
  }

  // 토큰 저장
  const storeData = async (returnValue) => {
    try {
      await AsyncStorage.setItem("access_token", returnValue);
      await AsyncStorage.setItem("refresh_token", returnValue);

      console.log("Token stored successfully:", returnValue);
    } catch (error) {
      console.error("Error storing token:", error);
    }
  };

  return (
    <View style={Styles.container}>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        scalesPageToFit={false}
        source={{
          uri: kakao_url,
          // uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={(event) => {
          KakaoLoginWebView(event.nativeEvent["url"]);
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
