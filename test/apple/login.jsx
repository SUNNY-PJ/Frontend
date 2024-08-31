import * as AppleAuthentication from "expo-apple-authentication";
import { View, StyleSheet, Alert } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { proxyUrl } from "../../constant/common";
import * as Sentry from "@sentry/react-native";
import useStore from "../../store/store";

const AppleLogin = () => {
  const url = proxyUrl;
  const navigation = useNavigation();
  const setProfile = useStore((state) => state.setProfile);

  async function handleAppleLogin() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      const idTokenVal = credential.identityToken;
      if (credential.authorizationCode) {
        await AsyncStorage.setItem(
          "authorizationCode",
          credential.authorizationCode
        );
        console.log("서버로 인증 코드를 전송합니다 :::", idTokenVal);
        // 서버로 인증 코드 전송
        await fetchData(idTokenVal);
      }
    } catch (e) {
      if (e.code === "ERR_CANCELED") {
        console.log("로그인 프로세스가 취소되었습니다.");
        showAlert({
          title: "로그인에 실패했습니다.",
          content: "잠시 후 다시 시도하세요.",
          buttons: [
            {
              text: "확인",
              color: "black",
              onPress: (id) => closeAlert(id),
            },
          ],
        });
      } else {
        console.error("Apple 로그인 오류:", e);
        alert(e);
      }
    }
  }

  const fetchData = async (idToken) => {
    console.log("login api를 요청합니다 :::");
    const projectId = Constants.expoConfig.extra.eas.projectId;

    console.log("project Id 입니다 :::", projectId);
    const apple_url = `${url}/apple/auth/callback`;
    console.log("Sending request to:", apple_url);

    try {
      console.log("Sending request to:", apple_url);
      const response = await axios.get(apple_url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        params: { code: idToken },
      });
      console.log("Response data:", response.data);

      if (response.status === 200) {
        const access_token = response.data.data.accessToken;
        const refresh_token = response.data.data.refreshToken;
        await AsyncStorage.setItem("access_token", access_token);
        await AsyncStorage.setItem("refresh_token", refresh_token);
        console.log("토큰:::", access_token);

        // 사용자 정보 가져오기 및 SSE 연결
        await fetchUserProfile();
        // await sseConnect();

        if (response.data.data.isUserRegistered) {
          navigation.replace("MainScreen", { screen: "Spending" });
        } else {
          navigation.replace("SignUpScreen", { screen: "SignUp" });
        }
      } else {
        console.error(`Error: Status code ${response.status}`);
        Alert.alert(
          "error",
          `로그인 중 에러가 발생했습니다.\n관리자에게 문의 바랍니다.`
        );
      }
    } catch (error) {
      Sentry.captureException(error);
      console.log("Error message:", error.message);
      if (error.response) {
        console.error("Server response error:", error.response);
        Alert.alert(
          "error",
          `로그인 중 에러가 발생했습니다.\n응답 코드: ${error.response.status}\n응답 메시지: ${error.response.data}`
        );
      } else if (error.request) {
        console.error("Network request error:", error.request);
        Alert.alert(
          "error",
          "로그인 중 에러가 발생했습니다.\n서버 응답 없음. 네트워크 상태를 확인하세요."
        );
      } else {
        console.error("Error setting up request:", error.message);
        Alert.alert(
          "error",
          `로그인 중 에러가 발생했습니다.\n오류 메시지: ${error.message}`
        );
      }
    }
  };

  const fetchUserProfile = async () => {
    const accessToken = await AsyncStorage.getItem("access_token");
    try {
      const response = await axios.get(`${url}/users`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        setProfile(response.data); // 프로필 데이터를 zustand 스토어에 저장
      } else {
        console.error(
          `Error fetching user profile: Status code ${response.status}`
        );
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error("Error fetching user profile:", error);
    }
  };

  // sse connect
  const sseConnect = async () => {
    const accessToken = await AsyncStorage.getItem("access_token");
    try {
      const response = await axios.get(`${url}/api/sse/subscribe`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {},
      });
      console.log("sse connect test ::: 연결합니다....", response.data);
    } catch (error) {
      console.error("sse 에러:", error);
    }
  };

  return (
    <View style={styles.container}>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={
          AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE
        }
        cornerRadius={5}
        style={styles.button}
        onPress={handleAppleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 48,
  },
  button: {
    width: 335,
    height: 50.25,
  },
});

export default AppleLogin;
