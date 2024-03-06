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
import { proxyUrl } from "../../constant/common";
import { useNavigation } from "@react-navigation/native";
import Line from "../../components/Line";
import Progress from "../../components/progress/progress";

const BattleStatus = ({ friendId }) => {
  const navigation = useNavigation();
  const inputURL = `competition/status${friendId}`;
  const url = proxyUrl + inputURL;

  const [data, setData] = useState({});

  const fetchData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });
      const StatusData = response.data;
      console.log(StatusData);
      if (response.status === 200) {
        setData(StatusData);
        // navigation.navigate("MainScreen", { screen: "FriendsList" });
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

  useEffect(() => {
    fetchData();
  }, [friendId]);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.boldText, { textAlign: "center" }]}>
          oo <Text style={[styles.text]}>을 걸고</Text>
          {"\n"}MM월 DD일
          <Text style={[styles.text]}>까지</Text> NNN,NNN원
          <Text style={[styles.text]}>&nbsp;쓰기</Text>
        </Text>
      </View>
      <Line h={2} color={"#1F1F1F"} />
      {/* <ScrollView> */}
      <View style={{ alignItems: "center" }}>
        <Text style={[styles.boldText]}>D - NN</Text>
        <Text style={[styles.boldText, { marginTop: 13, marginBottom: 10 }]}>
          나는
        </Text>
        <Progress progress={80} color={"#6ADCA3"} />
        <Text style={[styles.boldText]}>
          NN% <Text style={[styles.text]}>남았어요</Text>
        </Text>
        <Image
          source={require("../../assets/VSIcon.png")}
          style={{
            width: 51,
            height: 64,
            alignSelf: "center",
            marginTop: 25,
            marginBottom: 11,
          }}
        />
        <Text style={[styles.boldText, { marginBottom: 10 }]}>민규는</Text>
        <Progress progress={30} color={"#FAC337"} />
        <Text style={[styles.boldText]}>
          NN% <Text style={[styles.text]}>남았어요</Text>
        </Text>
        <Text
          style={[
            styles.subText,
            { textDecorationLine: "underline", marginTop: 40 },
          ]}
        >
          포기하기
        </Text>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFBF6",
    height: "100%",
  },
  section: {
    // paddingTop: 22,
    paddingBottom: 14,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  boldText: {
    fontSize: 22,
    fontWeight: 900,
    color: "#1F1F1F",
    marginTop: 14,
  },
  text: {
    fontSize: 20,
    fontWeight: 500,
    color: "#1F1F1F",
  },
  subText: {
    fontSize: 16,
    fontWeight: 700,
    color: "#5C5C5C",
  },
});

export default BattleStatus;
