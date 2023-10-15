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

const MyComment = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>댓글 내용 댓글 내내용용</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.description}>짱구</Text>
          <Text style={styles.description}>2023.11.17 17:19</Text>
        </View>
      </View>
      <Line color={"#C1C1C1"} h={1} />
      <View style={styles.box}>
        <Text style={styles.title}>여긴 댓글 내용임</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.description}>뿡뿡이는 무얼 먹을까</Text>
          <Text style={styles.description}>2023.11.17 17:19</Text>
        </View>
      </View>
      <Line color={"#C1C1C1"} h={1} />
      <View style={styles.box}>
        <Text style={styles.title}>댓글임</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.description}>롯데월드 갈 사람</Text>
          <Text style={styles.description}>2023.09.09 09:23</Text>
        </View>
      </View>
      <Line color={"#C1C1C1"} h={1} />
      <View style={styles.box}>
        <Text style={styles.title}>내가 쓴 댓글임</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.description}>하윙</Text>
          <Text style={styles.description}>2023.09.09 07:09</Text>
        </View>
      </View>
      <Line color={"#C1C1C1"} h={1} />
      <View style={styles.box}>
        <Text style={styles.title}>댓글임</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.description}>알라리알라숑</Text>
          <Text style={styles.description}>2023.09.09 07:09</Text>
        </View>
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

export default MyComment;
