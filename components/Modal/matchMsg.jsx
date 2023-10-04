import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Input from "../Input/input";
import LargeBtnBasic from "../Btn/largeBtnBasic";

const MatchMsg = () => {
  return (
    <View>
      <Text style={{ fontSize: 22, fontWeight: 700, color: "#1F1F1F" }}>
        민규에게 대결 신청
      </Text>
      <View>
        <Text style={{ fontSize: 16, fontWeight: 500, color: "#1F1F1F" }}>
          친구를 도발해보세요!
        </Text>
        <Input placeholder={"도발 메세지"} />
        <Text style={{ fontSize: 12, fontWeight: 500, color: "#5C5C5C" }}>
          * 최대 20자
        </Text>
      </View>
      <View>
        <Text style={{ fontSize: 16, fontWeight: 500, color: "#1F1F1F" }}>
          무엇을 걸고 대결할까요?
        </Text>
        <Input placeholder={"대결 보상"} />
      </View>
      <View>
        <Text style={{ fontSize: 16, fontWeight: 500, color: "#1F1F1F" }}>
          대결 기간과 금액을 설정해 주세요
        </Text>
        <Input placeholder={"대결 기간"} />
        <Text style={{ fontSize: 12, fontWeight: 500, color: "#5C5C5C" }}>
          * 상대가 승낙한 시점부터 대결이 시작됩니다
        </Text>
        <Input placeholder={"대결 금액"} />
      </View>
      <LargeBtnBasic text={"전송하기"} />
    </View>
  );
};

export default MatchMsg;
