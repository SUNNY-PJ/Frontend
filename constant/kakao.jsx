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

      console.log("데이터:", response.data);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // function KakaoLoginWebView(data) {
  //   console.log("카카오 로그인 시도");
  //   const exp = "code=";
  //   var condition = data.indexOf(exp);
  //   if (condition != -1) {
  //     var authorize_code = data.substring(condition + exp.length);
  //     console.log("코드:::", authorize_code);
  //     requestToken(authorize_code);
  //   }
  // }

  // const requestToken = async (authorize_code) => {
  //   var AccessToken = "none";
  //   axios({
  //     method: "post",
  //     url: "https://kauth.kakao.com/oauth/token",
  //     params: {
  //       grant_type: "authorization_code",
  //       client_id: REST_API_KEY,
  //       redirect_uri: REDIRECT_URI,
  //       code: authorize_code,
  //     },
  //   })
  //     .then((response) => {
  //       AccessToken = response.data.access_token;
  //       console.log("토큰:::", AccessToken);
  //       requestUserInfo(AccessToken);
  //       // storeData(AccessToken);
  //     })
  //     .catch(function (error) {
  //       console.log("error", error);
  //     });
  //   navigation.navigate("FriendsList", { screen: "FriendsList" });
  // };

  // function requestUserInfo(AccessToken) {
  //   axios({
  //     method: "GET",
  //     url: "https://kapi.kakao.com/v2/user/me",
  //     headers: {
  //       Authorization: `Bearer ${AccessToken}`,
  //     },
  //   })
  //     .then((response) => {
  //       // var user_emil = response.data.kakao_account.email;
  //       // var user_range = response.data.kakao_account.age_range;
  //       // var user_gender = response.data.kakao_account.gender;
  //       // console.log("user_emil", user_emil);
  //       // console.log("user_range", user_range);
  //       // console.log("user_gender", user_gender);
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log("error", error);
  //     });
  //   return;
  // }

  // const storeData = async (returnValue) => {
  //   try {
  //     await AsyncStorage.setItem("userAccessToken", returnValue);
  //     console.log(userAccessToken);
  //   } catch (error) {}
  // };

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
