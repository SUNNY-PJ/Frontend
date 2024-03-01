import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { proxyUrl } from "../../constant/common";
import { useCommunity } from "../../context/communityContext";
import { useNavigation } from "@react-navigation/native";
import Board from "./board";
import Tip from "./tip";

const Community = () => {
  const navigation = useNavigation();
  const { board, tip, setBoard, setTip, setCategory } = useCommunity();

  const boardClick = () => {
    setBoard(true);
    setTip(false);
    setCategory("FREE");
  };

  const tipClick = () => {
    setTip(true);
    setBoard(false);
    setCategory("TIP");
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 15,
          }}
        >
          <TouchableOpacity onPress={tipClick} activeOpacity={0.6}>
            <Text style={[styles.tabText, tip && styles.activeTabText]}>
              절약 꿀팁
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={boardClick} activeOpacity={0.6}>
            <Text style={[styles.tabText, board && styles.activeTabText]}>
              자유 게시판
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabBar}>
          <View style={[styles.tabBarLine, tip && styles.activeTabBarLine]} />
          <View style={[styles.tabBarLine, board && styles.activeTabBarLine]} />
        </View>
        {tip && <Tip />}
        {board && <Board />}
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
  tabText: {
    fontSize: 20,
    fontFamily: "SUITE_Bold",
    color: "#C1C1C1",
    paddingTop: 9,
    paddingBottom: 6,
  },
  activeTabText: {
    color: "#1F1F1F",
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
  activeTabBarLine: {
    backgroundColor: "#1F1F1F",
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: "center",
    marginTop: 12,
  },
});

export default Community;
