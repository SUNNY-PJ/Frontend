import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

// const REST_API_KEY = "56e15a4c7aaa857397437034b58c0016";
// const REDIRECT_URI = "http://192.168.50.45:19006";
// const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const Kakao = () => {
  console.log("페이지 진입");
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://43.201.176.22:8080/oauth2/authorize/kakao?redirect_uri=http://43.201.176.22:8080/auth/token"
      );
      console.log("데이터:", response);
      console.log("데이터1111:", response.data.data);

      // console.log("데이터:", response.data);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={Styles.container}>
      {/* <WebView
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
      /> */}
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
