import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { proxyUrl } from "./common";

function BattleStatus({ navigation }) {
  const [progress, setProgress] = useState(50);

  const inputURL = "";
  const cleanedURL = inputURL.replace(/[\u200B]/g, "");
  const url = proxyUrl + cleanedURL;

  const fetchData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (response.status === 200) {
        navigation.navigate("MainScreen", { screen: "Statistics" });
      }
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류:", error.response.data);
        console.error("서버 응답 메세지:", error.message);
      } else {
        console.error("에러:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 70, marginBottom: 24 }}>
        <Text style={[styles.topText, { marginTop: 0 }]}>
          oo을 걸고
          {"\n"}MM월 DD일까지 NNN,NNN원 쓰기
        </Text>
      </View>
      <Line h={2} color={"#1F1F1F"} />
      <ScrollView>
        <Text>D - NN</Text>
        <Text>나는</Text>
        <View
          style={{
            alignSelf: "center",
            width: 300,
            height: 32,
            borderRadius: 32,
            borderWidth: 1.5,
          }}
        >
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress}%`,
              },
            ]}
          />
          <Image
            source={require("../../assets/barIcon.png")}
            style={{
              width: 32,
              height: 32,
              alignSelf: "center",
              //   zIndex: 10,
            }}
          />
        </View>
        <Text>NN% 남았어요</Text>
        <Image
          source={require("../../assets/VSIcon.png")}
          style={{
            width: 51,
            height: 64,
            alignSelf: "center",
          }}
        />
        <Text>민규는 남았어요</Text>
        <View
          style={{
            alignSelf: "center",
            width: 300,
            height: 32,
            borderRadius: 32,
            borderWidth: 1.5,
          }}
        >
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress}%`,
              },
            ]}
          />
          <Image
            source={require("../../assets/barIcon.png")}
            style={{
              width: 32,
              height: 32,
              alignSelf: "center",
              //   zIndex: 10,
            }}
          />
        </View>
        <Text>NN% 남았어요</Text>
        <Text>포기하기</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFBF6",
    height: "100%",
  },
  contentContainer: {
    marginTop: 25,
    marginBottom: 40,
    paddingLeft: 28,
    paddingRight: 27,
  },
});

export default BattleStatus;
