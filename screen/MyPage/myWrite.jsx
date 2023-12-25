import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { proxyUrl } from "../../constant/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Line from "../../components/Line";
import { useNavigation } from "@react-navigation/native";

const MyWrite = () => {
  const navigation = useNavigation();
  const inputURL = "/mypage";
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
      {data.map((item) => (
        // mypage/{id} 이런 api가 필요..
        <TouchableOpacity
          key={item.id}
          onPress={() =>
            navigation.navigate("Detail", {
              screen: "Detail",
            })
          }
          activeOpacity={0.6}
        >
          <View style={styles.box}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.description}>{item.writer}</Text>
              <Text style={styles.description}>{item.createdAt}</Text>
              <Text style={styles.description}>조회 {item.view_cnt}</Text>
              <Text style={styles.description}>댓글 {item.comment_cnt}</Text>
            </View>
          </View>
          <Line color={"#C1C1C1"} h={1} />
        </TouchableOpacity>
      ))}
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
    paddingBottom: 12,
    paddingTop: 12,
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

export default MyWrite;
