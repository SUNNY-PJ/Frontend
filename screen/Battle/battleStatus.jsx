import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Line from "../../components/Line";
import Progress from "../../components/progress/progress";
import apiClient from "../../api/apiClient";
import { useRoute } from "@react-navigation/native";

const BattleStatus = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { friendId } = route.params;
  const { nickname } = route.params;

  const inputURL = `competition/status/${friendId}`;

  console.log("nickname::", nickname);
  console.log("friendId::", friendId);

  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      const StatusData = response.data.data;
      console.log("StatusData:::", StatusData);
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

  // 대결 포기
  const giveUpData = async () => {
    const url = `competition/give-up/${friendId}`;
    try {
      const response = await apiClient.delete(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
      const Data = response.data;
      console.log(Data);
      if (response.status === 200) {
        Alert.alert("대결 포기", "대결을 포기하시겠습니까?");
        // navigation.navigate("MainScreen", { screen: "FriendsList" });
        navigation.navigate("MainScreen", { screen: "FriendsListDisable" });
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

  const handleGiveUp = () => {
    giveUpData();
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text
          style={[styles.boldText, { textAlign: "center", marginTop: -10 }]}
        >
          {/* oo <Text style={[styles.text]}>을 걸고</Text> */}
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
        <Text style={[styles.boldText, { marginTop: 35 }]}>
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
        <Text style={[styles.boldText, { marginBottom: 10 }]}>
          {nickname}는
        </Text>
        <Progress progress={30} color={"#FAC337"} />
        <Text style={[styles.boldText]}>
          NN% <Text style={[styles.text]}>남았어요</Text>
        </Text>
        <TouchableOpacity onPress={handleGiveUp}>
          <Text
            style={[
              styles.subText,
              { textDecorationLine: "underline", marginTop: 40 },
            ]}
          >
            포기하기
          </Text>
        </TouchableOpacity>
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
    fontFamily: "SUITE_ExtraBold",
  },
  text: {
    fontSize: 20,
    fontWeight: 500,
    color: "#1F1F1F",
    fontFamily: "SUITE",
  },
  subText: {
    fontSize: 16,
    fontWeight: 700,
    color: "#5C5C5C",
    fontFamily: "SUITE_Bold",
  },
});

export default BattleStatus;
