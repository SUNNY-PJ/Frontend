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
import { useCommunity } from "../../context/communityContext";
import Line from "../../components/Line";
import { proxyUrl } from "../../constant/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomSheetScreen from "../../components/BottomSheet/BottomSheetScreen";
import { useNavigation } from "@react-navigation/native";

const Tip = () => {
  const navigation = useNavigation();
  const { data, fetchData, setTipSort, tipSort } = useCommunity();
  // const [selectedSort, setSelectedSort] = useState("LATEST");
  const [open, setOpen] = useState(false);

  const COMMUNITY_SORT = [
    { title: "최신순", data: "LATEST" },
    { title: "조회순", data: "VIEW" },
  ];

  const handleSortClick = () => {
    setOpen(!open);
    console.log("정렬하시게씀까");
  };

  const handleCategorySelect = (data) => {
    // setSelectedSort(data);
    setTipSort(data);
    console.log("여기가 팁이야", data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 검색
  const handleSearch = () => {
    console.log("게시글을 검색합니다.");
    navigation.navigate("MainScreen", { screen: "Search" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.section}>
          <TouchableOpacity activeOpacity={0.6} onPress={handleSortClick}>
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
                {tipSort === "LATEST" ? "최신순" : "조회순"}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              gap: 22,
            }}
          >
            <TouchableOpacity activeOpacity={0.6} onPress={handleSearch}>
              <Image
                source={require("../../assets/search.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
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
          {data &&
            data.map((item, index) => (
              // {data.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate("Detail", {
                    screen: "Detail",
                    params: {
                      itemId: item.id,
                      userId: item.userId,
                    },
                  })
                }
                activeOpacity={0.6}
              >
                <View style={styles.box}>
                  <Text style={styles.title}>{item.title}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.writer}>{item.writer}</Text>
                    <Text style={styles.description}>{item.createdAt}</Text>
                    <Text style={styles.description}>
                      조회 {item.viewCount}
                    </Text>
                    <Text style={styles.description}>
                      댓글 {item.commentCount}
                    </Text>
                  </View>
                </View>
                <Line color={"#C1C1C1"} h={2} />
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
      {open && (
        <BottomSheetScreen
          title={"정렬기준"}
          data={COMMUNITY_SORT}
          modalVisible={open}
          modalDisable={handleSortClick}
          onCategorySelect={handleCategorySelect}
        />
      )}
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
  title: {
    fontSize: 20,
    color: "#000",
    fontWeight: 500,
    padding: 4,
    fontFamily: "SUITE",
  },
  writer: {
    fontFamily: "SUITE",
    fontSize: 12,
    color: "#000",
    fontWeight: 500,
    padding: 3,
    gap: 8,
  },
  description: {
    fontFamily: "SUITE",
    fontSize: 10,
    color: "#000",
    fontWeight: 500,
    padding: 4,
    gap: 8,
  },
});

export default Tip;
