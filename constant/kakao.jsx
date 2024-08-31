// import React from "react";
// import { View, StyleSheet, ActivityIndicator } from "react-native";
// import WebView from "react-native-webview";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
// import { REST_API_KEY, REDIRECT_URI, INJECTED_JAVASCRIPT } from "../api/common";
// import axios from "axios";

// const Kakao = () => {
//   const navigation = useNavigation();
//   const kakao_url = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}/auth/kakao/callback&response_type=code`;

//   const handleWebViewMessage = (data) => {
//     KakaoLoginWebView(data);
//   };

//   function KakaoLoginWebView(data) {
//     console.log("카카오 로그인 시도:::", data);
//     const exp = "code=";
//     var condition = data.indexOf(exp);
//     if (condition != -1) {
//       var authorize_code = data.substring(condition + exp.length);
//       console.log("코드:::", authorize_code);
//       fetchData();
//     }
//   }

//   const fetchData = async () => {
//     console.log("카카오 fetch 실행");
//     try {
//       const response = await axios.get(kakao_url, {
//         headers: {
//           "Content-Type": "application/json; charset=utf-8",
//         },
//       });
//       // const access_token = response.headers.authorization;
//       const access_token = response.data.data.accessToken;
//       const refresh_token = response.data.data.refreshToken;
//       await AsyncStorage.setItem("access_token", access_token);
//       await AsyncStorage.setItem("refresh_token", refresh_token);
//       console.log("저장함::", access_token);
//       // postData();
//       navigation.replace("SignUpScreen", { screen: "SignUp" });
//     } catch (error) {
//       console.log("errorMessage:::", error);
//       if (error.response) {
//         console.error("서버 응답 오류: kakao login", error.response);
//       } else {
//         console.error("에러:", error);
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <WebView
//         style={{ flex: 1 }}
//         originWhitelist={["*"]}
//         scalesPageToFit={false}
//         source={{
//           uri: kakao_url,
//         }}
//         startInLoadingState={true}
//         renderLoading={() => (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="large" color="#000" />
//           </View>
//         )}
//         injectedJavaScript={INJECTED_JAVASCRIPT}
//         javaScriptEnabled
//         onMessage={(event) => {
//           handleWebViewMessage(event.nativeEvent["url"]);
//         }}
//       />
//     </View>
//   );
// };

// export default Kakao;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 24,
//     backgroundColor: "#fff",
//     zIndex: 100,
//   },
//   loadingContainer: {
//     flex: 1,
//     backgroundColor: "#fff",
//     zIndex: 100,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
