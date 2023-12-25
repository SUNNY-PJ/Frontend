import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { proxyUrl } from "../../constant/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Line from "../../components/Line";
import { useNavigation } from "@react-navigation/native";

const MyComment = () => {
  const navigation = useNavigation();
  const inputURL = "/mypage/mycomment";
  const url = proxyUrl + inputURL;

  const [data, setData] = useState([]);

  const fetchData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    console.log("get 실행");

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log("데이터:", response.data);

      const myWriteData = response.data.data;
      console.log(myWriteData.map((item) => item.id));
      setData(myWriteData);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("실행된건가");
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>댓글 내용 댓글 내내용용</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.description}>짱구</Text>
          <Text style={styles.description}>2023.11.17 17:19</Text>
        </View>
      </View>
      <Line color={"#C1C1C1"} h={1} />
      <View style={styles.box}>
        <Text style={styles.title}>여긴 댓글 내용임</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.description}>뿡뿡이는 무얼 먹을까</Text>
          <Text style={styles.description}>2023.11.17 17:19</Text>
        </View>
      </View>
      <Line color={"#C1C1C1"} h={1} />
      <View style={styles.box}>
        <Text style={styles.title}>댓글임</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.description}>롯데월드 갈 사람</Text>
          <Text style={styles.description}>2023.09.09 09:23</Text>
        </View>
      </View>
      <Line color={"#C1C1C1"} h={1} />
      <View style={styles.box}>
        <Text style={styles.title}>내가 쓴 댓글임</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.description}>하윙</Text>
          <Text style={styles.description}>2023.09.09 07:09</Text>
        </View>
      </View>
      <Line color={"#C1C1C1"} h={1} />
      <View style={styles.box}>
        <Text style={styles.title}>댓글임</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.description}>알라리알라숑</Text>
          <Text style={styles.description}>2023.09.09 07:09</Text>
        </View>
      </View>
      <Line color={"#C1C1C1"} h={1} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  box: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    paddingTop: 8,
    backgroundColor: "#fff",
  },
  title: { fontSize: 20, color: "#000", fontWeight: 500, padding: 4 },
  description: {
    fontSize: 12,
    color: "#000",
    fontWeight: 500,
    padding: 4,
    gap: 8,
  },
});

export default MyComment;
