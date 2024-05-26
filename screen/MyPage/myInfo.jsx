import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, Dimensions } from "react-native";
import { styles } from "./myInfo.styles";
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
    { key: "write", title: "작성 글" },
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
            style={styles.prevImg}
          />
        </TouchableOpacity>
        <Text style={styles.categoryText}>커뮤니티</Text>
      </View>
      <View style={styles.contentContainer}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
        <View style={styles.scrapSection}>
          <TouchableOpacity
            onPress={() => handleTabClick("scrap")}
            activeOpacity={0.6}
            style={{ paddingLeft: 34 }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "scrap" && styles.activeTabText,
                { left: 4 },
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
                { left: 8 },
              ]}
            >
              작성 글
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

export default MyInfo;
