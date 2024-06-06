import React, { useState, useEffect } from "react";
import {
  View,
  Image,
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

const MyScrap = () => {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;

  const [data, setData] = useState([]);
  const [isScrap, setIsScrap] = useState(true);
  const [scrapStates, setScrapStates] = useState({});

  const handleScrapClick = (itemId) => {
    setScrapStates((prevStates) => ({
      ...prevStates,
      [itemId]: !prevStates[itemId],
    }));

    if (scrapStates[itemId]) {
      deleteScrapData(itemId);
    } else {
      postScrapData(itemId);
    }
  };

  // 스크랩 삭제
  const deleteScrapData = async (itemId) => {
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
  const postScrapData = async (itemId) => {
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
    try {
      const response = await apiClient.get("/users/scrap", {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      const myScrapData = response.data;
      setData(myScrapData);

      // 스크랩 상태 초기화
      const newScrapStates = {};
      myScrapData.forEach((item) => {
        newScrapStates[item.communityId] = true;
      });
      setScrapStates(newScrapStates);
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
        <ScrollView style={{ height: windowHeight - 259 - 65 }}>
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
              <View style={styles.scrapBox}>
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
                  onPress={() => handleScrapClick(item.communityId)}
                  style={{ alignSelf: "center" }}
                >
                  <Image
                    source={
                      scrapStates[item.communityId]
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

export default MyScrap;
