import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { styles } from "./my.styles";
import Line from "../../components/Line";
import { useNavigation } from "@react-navigation/native";
import { formatDate } from "../../constant/formatData/format";
import apiClient from "../../api/apiClient";

const MyWrite = () => {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;

  const [data, setData] = useState([]);

  // 작성한 글 조회
  const fetchData = async () => {
    const inputURL = "/users/community";
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      const myWriteData = response.data;
      setData(Array.isArray(myWriteData) ? myWriteData : []);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <ScrollView style={{ height: windowHeight - 259 - 57 }}>
          {data.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigation.navigate("Detail", {
                  screen: "Detail",
                  params: {
                    itemId: item.communityId,
                    userId: item.userId,
                  },
                })
              }
              activeOpacity={0.6}
            >
              <View style={styles.box}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.description}>{item.writer}</Text>
                  <Text style={styles.description}>
                    {" "}
                    {formatDate(item.createdDate)}
                  </Text>
                  <Text style={styles.description}>조회 {item.viewCnt}</Text>
                  <Text style={styles.description}>댓글 {item.commentCnt}</Text>
                </View>
              </View>
              <Line color={"#C1C1C1"} h={1} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default MyWrite;
