import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import Line from "../../components/Line";
import { useNavigation } from "@react-navigation/native";
import { formatDate } from "../../constant/formatData/format";
import apiClient from "../../api/apiClient";

const FriendWrite = ({ userId, closeProfile }) => {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;

  const [data, setData] = useState([]);

  const navigateToDetail = (itemId, userId) => {
    closeProfile();
    navigation.navigate("Detail", {
      screen: "Detail",
      params: {
        itemId: itemId,
        userId: userId,
      },
    });
  };

  const fetchData = async () => {
    const inputURL = `/users/community`;
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        params: {
          userId: userId,
        },
      });
      console.log("데이터:", response.data);
      const myWriteData = response.data;
      setData(myWriteData);
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
        <ScrollView style={{ height: windowHeight - 259 - 80 }}>
          {data &&
            data.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => navigateToDetail(item.communityId, item.userId)}
                activeOpacity={0.6}
              >
                <View style={styles.box}>
                  <Text style={styles.title}>{item.title}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.description}>{item.writer}</Text>
                    <Text style={styles.description}>
                      {formatDate(item.createdDate)}
                    </Text>
                    <Text style={styles.description}>조회 {item.viewCnt}</Text>
                    <Text style={styles.description}>
                      댓글 {item.commentCnt}
                    </Text>
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
  title: {
    fontSize: 20,
    color: "#000",
    fontFamily: "SUITE_Medium",
    padding: 4,
  },
  description: {
    fontSize: 12,
    color: "#000",
    fontFamily: "SUITE",

    padding: 4,
    gap: 8,
  },
});

export default FriendWrite;
