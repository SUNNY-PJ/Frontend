import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import Line from "../../components/Line";
import { useNavigation } from "@react-navigation/native";
import { formatDate } from "../../constant/formatData/format";
import apiClient from "../../api/apiClient";

const MyScrap = () => {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;

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
    const inputURL = `/scrap/${itemId}`;
    try {
      const response = await apiClient.delete(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      console.log(response.data);
      fetchData();
    } catch (error) {
      console.error("에러:", error);
    }
  };

  // 스크랩 등록
  const postScrapData = async () => {
    const inputURL = `/scrap/${itemId}`;
    try {
      const response = await apiClient.post(
        inputURL,
        {},
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
      fetchData();
    } catch (error) {
      console.error("에러:", error);
    }
  };

  // 스크랩 조회
  const fetchData = async () => {
    const inputURL = "/users/scrap";
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      const myScrapData = response.data;
      setData(myScrapData);
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
                <View>
                  <Text style={[styles.title]}>{item.title}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.description]}>{item.writer}</Text>
                    <Text style={[styles.description]}>
                      {formatDate(item.createDate)}
                    </Text>
                    <Text style={[styles.description]}>
                      조회 {item.viewCnt}
                    </Text>
                    <Text style={[styles.description]}>
                      댓글 {item.commentCnt}
                    </Text>
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
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 12,
    paddingTop: 12,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    color: "#000",
    padding: 4,
    fontFamily: "SUITE_Medium",
  },
  description: {
    fontSize: 12,
    color: "#000",
    padding: 4,
    gap: 8,
    fontFamily: "SUITE",
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default MyScrap;
