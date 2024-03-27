import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Line from "../../components/Line";
import Progress from "../../components/progress/progress";
import apiClient from "../../api/apiClient";

const BattleStatusDisable = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { friendId } = route.params;
  const { nickname } = route.params;

  const inputURL = `competition/status/${friendId}`;
  const [data, setData] = useState({});
  const [price, setPrice] = useState("");

  const formatStatusData = (data) => {
    const formattedData = { ...data };
    const endDate = new Date(data.end_date);
    formattedData.end_date = `${
      endDate.getMonth() + 1
    }월 ${endDate.getDate()}일`;
    return formattedData;
  };

  const formatPriceData = (price) => {
    const formatter = new Intl.NumberFormat("ko-KR");
    return formatter.format(price);
  };

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
        const formattedData = formatStatusData(StatusData);
        setData(formattedData);
        setPrice(formatPriceData(StatusData.price));
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

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.boldText, { textAlign: "center", marginTop: 16 }]}>
          {/* {data.compensation}을 걸고 {"\n"} */}
          {data.end_date}까지 {price}원 쓰기
        </Text>
      </View>
      <Line h={2} color={"#1F1F1F"} />
      {/* <ScrollView> */}
      <View style={{ alignItems: "center" }}>
        <Text
          style={[styles.boldSmallText, { marginBottom: 16, marginTop: 25 }]}
        >
          친구의 탈퇴로 대결이 자동 종료되었어요
        </Text>
        <Text style={[styles.boldText, { marginTop: 13, marginBottom: 10 }]}>
          나는
        </Text>
        <Progress progress={50} color={"#C1C1C1"} />
        <Text style={[styles.boldText, { marginTop: 35 }]}>
          {data.user_percent}%<Text style={[styles.text]}>남았어요</Text>
        </Text>
        <Image
          source={require("../../assets/VSIconDisable.png")}
          style={{
            width: 51,
            height: 64,
            alignSelf: "center",
            marginTop: 25,
            marginBottom: 11,
          }}
        />
        <Text style={[styles.boldText, { marginBottom: 10 }]}>
          {nickname}님은
        </Text>
        <Progress progress={50} color={"#C1C1C1"} />
        <Text style={[styles.boldText]}>
          {data.friends_percent}% <Text style={[styles.text]}>남았어요</Text>
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
    color: "#C1C1C1",
    marginTop: 14,
    fontFamily: "SUITE_ExtraBold",
  },
  boldSmallText: {
    fontSize: 16,
    fontWeight: 900,
    color: "#1F1F1F",
    marginTop: 14,
    fontFamily: "SUITE_ExtraBold",
  },
  text: {
    fontSize: 20,
    fontWeight: 500,
    color: "#C1C1C1",
    fontFamily: "SUITE",
  },
  subText: {
    fontSize: 16,
    fontWeight: 700,
    color: "#5C5C5C",
    fontFamily: "SUITE_Bold",
  },
});

export default BattleStatusDisable;
