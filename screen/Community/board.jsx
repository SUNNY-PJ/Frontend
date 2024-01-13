import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { proxyUrl } from "../../constant/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useCommunity } from "../../context/communityContext";
import BottomSheetScreen from "../../components/BottomSheet/BottomSheetScreen";
import Line from "../../components/Line";

const Board = () => {
  const navigation = useNavigation();
  const { data, fetchData, setBoardSort, boardSort } = useCommunity();
  const [open, setOpen] = useState(false);

  const COMMUNITY_SORT = [{ title: "최신순" }, { title: "조회순" }];

  const handleSortClick = () => {
    setOpen(!open);
    console.log("정렬하시게씀까");
  };

  const handleCategorySelect = (data) => {
    setBoardSort(data);
  };

  useEffect(() => {
    fetchData();
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
              {boardSort}
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
            <View>
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
            </View>
          </TouchableOpacity>
        ))}
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

export default Board;
