import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import LargeBtnBasic from "../components/Btn/largeBtnBasic";

const SiginUp = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({ headerShown: false });
    }, [])
  );
  const showBottom = false;

  const [isInputFocused, setInputFocused] = useState(false);

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
          marginTop: 75,
          alignSelf: "center",
          width: 120,
          height: 170,
        }}
      />
      <Text
        style={{
          fontSize: 16,
          fontWeight: 500,
          color: "#1F1F1F",
          marginTop: 40,
          alignSelf: "center",
        }}
      >
        써니에서 사용할 별명을 설정해주세요
      </Text>
      <TextInput
        placeholder="별명"
        style={{
          width: 320,
          height: 48,
          padding: "14px 11px",
          paddingLeft: 10,
          borderWidth: isInputFocused ? 1.5 : 1.5,
          borderColor: isInputFocused ? "#FFA851" : "#C1C1C1",
          borderRadius: 8,
          marginTop: 16,
          alignSelf: "center",
          color: "black",
        }}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
      />
      <Text
        style={{
          marginTop: 8,
          fontSize: 12,
          fontWeight: 500,
          color: "#1F1F1F",
          textAlign: "center",
          marginBottom: 278,
        }}
      >
        * 2~10자 이내, 특수문자 및 숫자 사용 가능, 이모지 사용 불가
      </Text>
      <LargeBtnBasic text={"시작하기"} />
    </View>
  );
};

export default SiginUp;
