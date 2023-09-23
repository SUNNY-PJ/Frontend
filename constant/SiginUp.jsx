import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

const SiginUp = ({ navigation }) => {
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
          borderWidth: isInputFocused ? 1.5 : 1.5, // 테두리 두께 설정
          borderColor: isInputFocused ? "#FFA851" : "#C1C1C1",
          borderRadius: 8,
          marginTop: 16,
          alignSelf: "center",
          outline: "none",
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
        }}
      >
        * 2~10자 이내, 특수문자 및 숫자 사용 가능, 이모지 사용 불가
      </Text>
      <TouchableOpacity
        style={{
          paddingVertical: 12,
          paddingHorizontal: 0,
          borderRadius: 8,
          borderWidth: 1.5,
          borderColor: "#1F1F1F",
          backgroundColor: "white",
          width: 335,
          height: 48,
          alignSelf: "center",
          marginTop: 278,
          alignItems: "center", // 버튼 내부의 텍스트를 가운데 정렬
          justifyContent: "center", // 버튼 내부의 텍스트를 가운데 정렬
        }}
        onPress={() => {
          // 버튼 클릭 시 실행할 함수
        }}
      >
        <Text style={{ color: "#1F1F1F", fontWeight: "bold" }}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SiginUp;
