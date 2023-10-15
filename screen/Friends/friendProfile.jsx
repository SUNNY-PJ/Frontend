import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Button,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import MyComment from "../MyPage/myComment";

const FriendProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const activeTabVal = route.params?.activeTab || "scrap";

  const [activeTab, setActiveTab] = useState(activeTabVal);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [board, setBoard] = useState(false);
  const [tip, setTip] = useState(true);

  const historyClick = () => {
    setBoard(true);
    setTip(false);
  };

  const tipClick = () => {
    setTip(true);
    setBoard(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingLeft: 24, marginTop: 64 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MyPage", {
              screen: "MyPage",
            })
          }
        >
          <Image
            source={require("../../assets/close.png")}
            style={{ width: 14, height: 14 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <View style={{ alignSelf: "center", gap: 5 }}>
          <Image
            source={require("../../assets/friend_profile.png")}
            style={{ width: 92, height: 92 }}
          />
          <Text style={styles.name}>민지</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 60,
            alignSelf: "center",
            marginTop: 27,
          }}
        >
          <TouchableOpacity style={styles.button}>
            <Text
              style={{
                color: "#000 ",
                fontSize: 15,
                fontWeight: 700,
                alignSelf: "center",
              }}
            >
              대화하기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text
              style={{
                color: "#000 ",
                fontSize: 15,
                fontWeight: 700,
                alignSelf: "center",
              }}
            >
              친구맺기
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 40,
            marginBottom: 18,
          }}
        >
          <TouchableOpacity onPress={tipClick} activeOpacity={0.6}>
            <Text style={[styles.tabText, tip && styles.activeTabText]}>
              작성한 글
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={historyClick} activeOpacity={0.6}>
            <Text style={[styles.tabText, board && styles.activeTabText]}>
              댓글단 글
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabBar}>
          <View style={[styles.tabBarLine, tip && styles.activeTabBarLine]} />
          <View style={[styles.tabBarLine, board && styles.activeTabBarLine]} />
        </View>
        {tip && <MyComment />}
        {board && <MyComment />}
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
  contentContainer: {},
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 24,
    marginTop: 17,
    marginBottom: 18,
  },
  tabText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#C1C1C1",
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
  name: {
    color: "#1F1F1F",
    fontSize: 22,
    fontWeight: 700,
    alignSelf: "center",
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
  button: {
    backgroundColor: "#FFC891",
    paddingBottom: 6,
    paddingTop: 6,
    width: 89,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#1F1F1F",
  },
});

export default FriendProfile;
