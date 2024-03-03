import * as AppleAuthentication from "expo-apple-authentication";
import { View, StyleSheet } from "react-native";

async function handleAppleLogin() {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    // mutate({
    //   id_token: credential.identityToken,
    //   provider: "APPLE",
    //   name: credential.fullName.nickname,
    // });
    console.log("인증 코드:", credential.authorizationCode);
    console.log("사용자 이름:", credential.fullName);
    console.log("사용자 이메일:", credential.email);

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

const AppleLogin = () => {
  return (
    <View style={styles.container}>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.button}
        onPress={handleAppleLogin}
        // onPress={async () => {
        //   try {
        //     const credential = await AppleAuthentication.signInAsync({
        //       requestedScopes: [
        //         AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        //         AppleAuthentication.AppleAuthenticationScope.EMAIL,
        //       ],
        //     });
        //     mutate({
        //       id_token: credential.identityToken,
        //       provider: "APPLE",
        //       name: credential.fullName.nickname,
        //     });
        //     // signed in
        //   } catch (e) {
        //     if (e.code === "ERR_REQUEST_CANCELED") {
        //       showAlert({
        //         title: "로그인에 실패했습니다.",
        //         content: "잠시 후 다시 시도하세요.",
        //         buttons: [
        //           {
        //             text: "확인",
        //             color: "black",
        //             onPress: (id) => closeAlert(id),
        //           },
        //         ],
        //       });
        //     } else {
        //       // handle other errors
        //     }
        //   }
        // }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    height: 44,
  },
});

export default AppleLogin;
