import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import Line from "../../components/Line";
import { useNavigation } from "@react-navigation/native";

const Tip = () => {
  const navigation = useNavigation();

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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Detail", {
              screen: "Detail",
            })
          }
          activeOpacity={0.6}
        >
          <View style={styles.box}>
            <Text style={styles.title}>절약 꿀팁 게시판입니다</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.description}>하루1</Text>
              <Text style={styles.description}>20 시간 전</Text>
              <Text style={styles.description}>조회 1,411</Text>
              <Text style={styles.description}>댓글 22</Text>
            </View>
          </View>
        </TouchableOpacity>

        <Line color={"#C1C1C1"} h={2} />
        <View style={styles.box}>
          <Text style={styles.title}>test</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.description}>하루2</Text>
            <Text style={styles.description}>1 시간 전</Text>
            <Text style={styles.description}>조회 2</Text>
            <Text style={styles.description}>댓글 0</Text>
          </View>
        </View>
        <Line color={"#C1C1C1"} h={2} />
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
