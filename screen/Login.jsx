import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";

const Login = () => {
  const navigation = useNavigation();

  const handleKakaoLogin = () => {
    // navigation.navigate("Kakao", { screen: "Kakao" });
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
      <Image
        source={require("../assets/SUNNY.png")}
        style={{
          marginTop: 119,
          alignSelf: "center",
          width: 120,
          height: 170,
        }}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 500,
          fontFamily: "SUITE_Medium",
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
