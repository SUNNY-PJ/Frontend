import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import MyScrap from "./myScrap";
import MyWrite from "./myWrite";
import MyComment from "./myComment";

const MyInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const activeTabVal = route.params?.activeTab || "scrap";
  const initialLayout = { width: Dimensions.get("window").width };
  const [activeTab, setActiveTab] = useState(activeTabVal);
  const [profile, setProfile] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "scrap":
        setIndex(0);
        break;
      case "write":
        setIndex(1);
        break;
      case "comment":
        setIndex(2);
        break;
      default:
        setIndex(0);
    }
  };

  useEffect(() => {
    switch (index) {
      case 0:
        setActiveTab("scrap");
        break;
      case 1:
        setActiveTab("write");
        break;
      case 2:
        setActiveTab("comment");
        break;
      default:
        setActiveTab("scrap");
    }
  }, [index]);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "scrap", title: "스크랩" },
    { key: "write", title: "작성글" },
    { key: "comment", title: "작성 댓글" },
  ]);

  const renderScene = SceneMap({
    scrap: MyScrap,
    write: MyWrite,
    comment: MyComment,
  });

  return (
    <View style={styles.container}>
      <View style={{}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MyPage", {
              screen: "MyPage",
            })
          }
        >
          <Image
            source={require("../../assets/prevBtn.png")}
            style={{ width: 24, height: 24, marginTop: 16, marginLeft: 20 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 16,
            color: "#1F1F1F",
            fontWeight: 700,
            alignSelf: "center",
            bottom: 17,
          }}
        >
          커뮤니티
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 29,
            marginBottom: 6,
          }}
        >
          <TouchableOpacity
            onPress={() => handleTabClick("scrap")}
            activeOpacity={0.6}
            style={{ paddingLeft: 34 }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "scrap" && styles.activeTabText,
              ]}
            >
              스크랩
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleTabClick("write")}
            activeOpacity={0.6}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "write" && styles.activeTabText,
              ]}
            >
              작성글
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleTabClick("comment")}
            activeOpacity={0.6}
            style={{ paddingRight: 34 }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "comment" && styles.activeTabText,
              ]}
            >
              작성 댓글
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabBar}>
          <View
            style={[
              styles.tabBarLine,
              activeTab === "scrap" && styles.activeTabBarLine,
            ]}
          />
          <View
            style={[
              styles.tabBarLine,
              activeTab === "write" && styles.activeTabBarLine,
            ]}
          />
          <View
            style={[
              styles.tabBarLine,
              activeTab === "comment" && styles.activeTabBarLine,
            ]}
          />
        </View>
        {activeTab === "scrap" && <MyScrap />}
        {activeTab === "write" && <MyWrite />}
        {activeTab === "comment" && <MyComment />}
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
    fontFamily: "SUIT_Bold",
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
  name: { fontSize: 20, color: "#1F1F1F", fontWeight: 900 },
  setting: {
    fontSize: 16,
    color: "#5C5C5C",
    fontWeight: 600,
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

export default MyInfo;
