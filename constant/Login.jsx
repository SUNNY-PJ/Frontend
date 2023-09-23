import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import WebView from "react-native-webview";

const Login = ({ navigation }) => {
  const REST_API_KEY = "56e15a4c7aaa857397437034b58c0016";
  const REDIRECT_URI = "http://192.168.50.45:19000";

  const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

  const handleKakaoLogin = () => {
    navigation.navigate("Kakao");
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#FFFBF6",
      }}
    >
      {/* <WebView
        style={{ flex: 1 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={(event) => {
          const data = event.nativeEvent.url;
          getCode(data);
        }}
      /> */}
      <Image
        source={require("../assets/SUNNY.png")}
        style={{
          marginTop: 75,
          alignSelf: "center",
        }}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 500,
          color: "#1F1F1F",
          marginTop: 48,
          textAlign: "center",
        }}
      >
        간편하게 로그인하고 {"\n"}
        써니의 서비스를 이용해보세요
      </Text>
      <TouchableOpacity onPress={handleKakaoLogin} activeOpacity={0.6}>
        <Image
          // source={require("../assets/kakao_login_medium_wide.png")}
          source={require("../assets/kakao_login_large.png")}
          style={{
            width: 335,
            height: 50.25,
            marginTop: 48,
            alignSelf: "center",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Login;
