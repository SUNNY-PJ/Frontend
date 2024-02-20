import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { proxyUrl } from "../../constant/common";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Line from "../../components/Line";
import { useNavigation } from "@react-navigation/native";
import { formatDate } from "../../constant/formatData/format";

const MyScrap = () => {
  const navigation = useNavigation();
  const inputURL = "/users/scrap";
  const url = proxyUrl + inputURL;
  const [data, setData] = useState([]);
  const [isScrap, setIsScrap] = useState(true);

  const handleScrapClick = () => {
    setIsScrap(!isScrap);
    if (isScrap) {
      deleteScrapData();
    } else {
      postScrapData();
    }
  };

  // 스크랩 삭제
  const deleteScrapData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    const inputURL = `/scrap/${itemId}`;
    const url = proxyUrl + inputURL;

    try {
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  // 스크랩 등록
  const postScrapData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    const inputURL = `/scrap/${itemId}`;
    const url = proxyUrl + inputURL;

    try {
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const fetchData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    console.log(access_token);
    console.log("get 실행");

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });
      const myScrapData = response.data;
      console.log(myScrapData);
      // console.log(myWriteData.map((item) => item.id));
      setData(myScrapData);
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
        <TouchableOpacity
          key={item.id}
          // onPress={() =>
          //   navigation.navigate("Detail", {
          //     screen: "Detail",
          //     params: {
          //       itemId: item.id,
          //       userId: item.userId,
          //     },
          //   })
          // }
          activeOpacity={0.6}
        >
          <View style={styles.box}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.description}>{item.writer}</Text>
                <Text style={styles.description}>
                  {formatDate(item.createDate)}
                </Text>
                <Text style={styles.description}>조회 {item.viewCnt}</Text>
                <Text style={styles.description}>댓글 {item.commentCnt}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleScrapClick}
              style={{ alignSelf: "center" }}
            >
              <Image
                source={
                  isScrap
                    ? require("../../assets/myPage_scrap_active.png")
                    : require("../../assets/myPage_scrap_inactive.png")
                }
                style={styles.icon}
              />
            </TouchableOpacity>
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
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 12,
    paddingTop: 12,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  title: { fontSize: 20, color: "#000", fontWeight: 500, padding: 4 },
  description: {
    fontSize: 12,
    color: "#000",
    fontWeight: 500,
    padding: 4,
    gap: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default MyScrap;
