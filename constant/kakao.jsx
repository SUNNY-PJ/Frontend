import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const REST_API_KEY = "56e15a4c7aaa857397437034b58c0016";
const REDIRECT_URI = "http://192.168.50.45:19006";
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const Kakao = () => {
  console.log("페이지 진입");
  const navigation = useNavigation();

  // 로그인 페이지(임시로 지출현황 버튼 클릭 후 로그인 페이지 진입)에서
  // 카카오 로그인 버튼 누른 후 로그인까지 해야 코드/토큰 발급 받을 수 있음
  function KakaoLoginWebView(data) {
    console.log("카카오 로그인 시도:::");
    const exp = "code=";
    var condition = data.indexOf(exp);
    if (condition != -1) {
      var authorize_code = data.substring(condition + exp.length);
      console.log("코드:::", authorize_code);
      requestToken(authorize_code);
    }
  }

  const requestToken = async (authorize_code) => {
    var AccessToken = "none";
    axios({
      method: "post",
      url: "https://kauth.kakao.com/oauth/token",
      params: {
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: authorize_code,
      },
    })
      .then((response) => {
        AccessToken = response.data.access_token;
        console.log("토큰:::", AccessToken);
        requestUserInfo(AccessToken);
      })
      .catch(function (error) {
        console.log("error", error);
      });
    // 로그인 성공 후 코드/토큰 발급 받으면 친구 목록으로 이동함
    navigation.navigate("FriendsList", { screen: "FriendsList" });
  };

  return (
    <View style={Styles.container}>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        scalesPageToFit={false}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
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
