import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Line from "../../components/Line";
import { proxyUrl } from "../../constant/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Tip = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  const inputURL = "/community";

  const url = proxyUrl + inputURL;

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
        params: {
          boardType: "꿀팁",
        },
      });

      console.log("데이터:", response.data.content);
      const communityData = response.data.content;
      console.log(communityData.map((item) => item.title));
      setData(communityData);
      console.log(data);
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
      <View style={styles.contentContainer}>
        <View style={styles.section}>
          <View style={{ flexDirection: "row", gap: 3 }}>
            <Image
              source={require("../../assets/sort.png")}
              style={styles.icon}
            />
            <Text
              style={{
                color: "#262626",
                fontSize: 15,
                fontWeight: 500,
                alignSelf: "center",
              }}
            >
              최신순
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 22,
            }}
          >
            <Image
              source={require("../../assets/search.png")}
              style={styles.icon}
            />
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                navigation.navigate("Post", {
                  screen: "Post",
                })
              }
            >
              <Image
                source={require("../../assets/write.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Line color={"#C1C1C1"} h={2} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {/* <Line color={"#C1C1C1"} h={2} /> */}
          {data.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigation.navigate("Detail", {
                  screen: "Detail",
                  params: {
                    itemId: item.id,
                  },
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
                  <Text style={styles.description}>
                    댓글 {item.comment_cnt}
                  </Text>
                </View>
              </View>
              <Line color={"#C1C1C1"} h={2} />
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
    // flex: 1,
  },
  contentContainer: {
    marginBottom: 40,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 24,
    marginTop: 17,
    marginBottom: 18,
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: "center",
    marginTop: 12,
  },
  tabBar: {
    flexDirection: "row",
    // marginBottom: 12,
  },
  tabBarLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#C1C1C1",
  },
  icon: {
    width: 20,
    height: 20,
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

export default Tip;
