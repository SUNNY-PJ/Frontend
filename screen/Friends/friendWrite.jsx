import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { proxyUrl } from "../../constant/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Line from "../../components/Line";
import { useNavigation } from "@react-navigation/native";
import { formatDate } from "../../constant/formatData/format";

const FriendWrite = ({ userId }) => {
  const navigation = useNavigation();
  const inputURL = `/users/community`;
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
        params: {
          userId: userId,
        },
      });

      console.log("데이터:", response.data);

      const myWriteData = response.data;
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
        <View>
          <View style={styles.box}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.description}>{item.writer}</Text>
              <Text style={styles.description}>
                {formatDate(item.createdDate)}
              </Text>
              <Text style={styles.description}>조회 {item.viewCnt}</Text>
              <Text style={styles.description}>댓글 {item.commentCnt}</Text>
            </View>
          </View>
          <Line color={"#C1C1C1"} h={1} />
        </View>
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

export default FriendWrite;
