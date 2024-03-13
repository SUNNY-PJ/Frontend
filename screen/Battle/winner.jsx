import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { proxyUrl } from "../../constant/common";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Line from "../../components/Line";
import { useNavigation } from "@react-navigation/native";

const Winner = () => {
  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "#FFFBF6",
        height: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          marginTop: 25,
          marginBottom: 40,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#1F1F1F",
            textAlign: "center",
            marginBottom: 24,
            fontFamily: "SUITE_Bold",
          }}
        >
          채팅 목록
        </Text>
        <Line color={"#C1C1C1"} h={1} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 48,
    height: 48,
  },
});

export default Winner;
