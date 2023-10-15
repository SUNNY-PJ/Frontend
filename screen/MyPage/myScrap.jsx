import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import Line from "../../components/Line";
import { useNavigation } from "@react-navigation/native";

const MyScrap = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View>
          <Text style={styles.title}>스크랩했다고</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.description}>아하하하하하</Text>
            <Text style={styles.description}>2023.09.09</Text>
            <Text style={styles.description}>조회 1,411</Text>
            <Text style={styles.description}>댓글 22</Text>
          </View>
        </View>
        <Image
          source={require("../../assets/myPage_scrap_active.png")}
          style={styles.icon}
        />
      </View>
      <Line color={"#C1C1C1"} h={1} />
      <View style={styles.box}>
        <View>
          <Text style={styles.title}>스크랩 test test</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.description}>아하하하하하</Text>
            <Text style={styles.description}>2023.10.03</Text>
            <Text style={styles.description}>조회 12</Text>
            <Text style={styles.description}>댓글 22</Text>
          </View>
        </View>
        <Image
          source={require("../../assets/myPage_scrap_active.png")}
          style={styles.icon}
        />
      </View>
      <Line color={"#C1C1C1"} h={1} />
      <View style={styles.box}>
        <View>
          <Text style={styles.title}>test</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.description}>test</Text>
            <Text style={styles.description}>2022.12.09</Text>
            <Text style={styles.description}>조회 411</Text>
            <Text style={styles.description}>댓글 102</Text>
          </View>
        </View>
        <Image
          source={require("../../assets/myPage_scrap_active.png")}
          style={styles.icon}
        />
      </View>
      <Line color={"#C1C1C1"} h={1} />
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
    alignSelf: "center",
  },
});

export default MyScrap;
