import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AppleLogin from "../test/apple/login";

const Login = () => {
  const navigation = useNavigation();

  // const handleKakaoLogin = () => {
  //   navigation.navigate("KakaoScreen", { screen: "AppleLogin" });
  //   // navigation.navigate("Kakao");
  // };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/SUNNY.png")}
        style={styles.img}
        resizeMode="contain"
      />
      <Text style={styles.title}>
        간편하게 로그인하고 {"\n"}
        써니의 서비스를 이용해보세요
      </Text>
      {/* <TouchableOpacity onPress={handleKakaoLogin} activeOpacity={0.6}>
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
      </TouchableOpacity> */}
      <AppleLogin />
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
  },
  img: {
    marginTop: verticalScale(119),
    alignSelf: "center",
    width: width > 375 ? scale(120) : scale(100),
    height: verticalScale(width > 375 ? 170 : 140),
  },
  title: {
    fontFamily: "SUITE_Medium",
    color: "#1F1F1F",
    marginTop: verticalScale(48),
    textAlign: "center",
    fontSize: moderateScale(width > 375 ? 20 : 18),
  },
});

export default Login;
