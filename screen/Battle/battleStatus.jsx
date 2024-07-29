import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { styles } from "./battleStatus.styles";
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
  const { competitionId } = route.params;

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
        params: { competitionId: competitionId },
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
        console.error("서버 응답 오류: battle status", error.response.data);
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
        navigation.replace("MainScreen", {
          screen: "BattleStatusDisable",
          params: {
            friendId: friendId,
            nickname: nickname,
            end_date: data.end_date,
            price: data.price,
            user_percent: data.user_percent,
            friends_percent: data.friends_percent,
          },
        });
      }
    } catch (error) {
      if (error.response) {
        console.error(
          "서버 응답 오류: battle status disabled",
          error.response.data
        );
        console.error("서버 응답 메세지:", error.message);
      } else {
        console.error("에러:", error);
      }
    }
  };

  const handleGiveUp = () => {
    Alert.alert(
      "",
      "대결을 포기하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: () => giveUpData(),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text
          style={[styles.boldText2, { textAlign: "center", marginTop: 16 }]}
        >
          {data.compensation}
          <Text style={styles.text}>을 걸고</Text>
          {"\n"}
          {data.end_date}
          <Text style={styles.text}>까지</Text> {price}원{" "}
          <Text style={styles.text}>쓰기</Text>
        </Text>
      </View>
      <Line h={2} color={"#1F1F1F"} />
      {/* <ScrollView> */}
      <View style={{ alignItems: "center" }}>
        <Text style={[styles.boldText2, { marginTop: 49 }]}>
          D - {data.day}
        </Text>
        <Text style={[styles.boldText2, { marginTop: 13, marginBottom: 10 }]}>
          나는
        </Text>
        <Progress progress={data.user_percent} />
        <Text style={[styles.boldText2, { marginTop: 24 }]}>
          {data.user_percent}% <Text style={[styles.text]}>남았어요</Text>
        </Text>
        <Image
          source={require("../../assets/VSIcon.png")}
          style={styles.vsIcon}
        />
        <Text style={[styles.boldText2, { marginBottom: 10, marginTop: 28 }]}>
          {nickname}님은
        </Text>
        <Progress progress={data.friends_percent} />
        <Text style={[styles.boldText2, { marginTop: 24 }]}>
          {data.friends_percent}%
          <Text style={[styles.text, { color: "#1F1F1F" }]}>남았어요</Text>
        </Text>
        <TouchableOpacity onPress={handleGiveUp}>
          <Text style={[styles.subText, styles.giveUp]}>포기하기</Text>
        </TouchableOpacity>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default BattleStatus;
