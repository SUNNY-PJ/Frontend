import * as AppleAuthentication from "expo-apple-authentication";
import { View, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AppleLogin = () => {
  const navigation = useNavigation();

  async function handleAppleLogin() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      const idTokenVal = credential.identityToken;
      // console.log("인증 코드:", credential.identityToken);
      if (credential.authorizationCode) {
        AsyncStorage.setItem("authorizationCode", credential.authorizationCode);
        // 서버로 인증 코드 전송
        fetchData(idTokenVal);
      }

      // 서버로 인증 코드 전송 및 사용자 정보 처리 로직 구현
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
      }
    }
  }

  const fetchData = async (idToken) => {
    const apple_url = `http://43.201.176.22:8080/apple/auth/callback`;
    try {
      const response = await axios.get(apple_url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        params: { code: idToken },
      });
      console.log("apple 로그인 실행", response.data);

      if (response.status === 200) {
        const access_token = response.data.data.accessToken;
        const refresh_token = response.data.data.refreshToken;
        await AsyncStorage.setItem("access_token", access_token);
        await AsyncStorage.setItem("refresh_token", refresh_token);

        if (response.data.data.isUserRegistered) {
          navigation.replace("MainScreen", { screen: "Spending" });
        } else {
          navigation.replace("SignUpScreen", { screen: "SignUp" });
        }
      } else {
        Alert.alert(
          "error",
          `로그인 중 에러가 발생했습니다.\n관리자에게 문의 바랍니다.`
        );
      }
    } catch (error) {
      console.log("errorMessage:::", error);
      Alert.alert(
        "error",
        `로그인 중 에러가 발생했습니다.\n관리자에게 문의 바랍니다.`
      );
      if (error.response) {
        console.error("서버 응답 오류:", error.response);
      } else {
        console.error("에러:", error);
      }
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
    // flex: 1,
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
