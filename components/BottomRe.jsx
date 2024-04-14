import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSaveData } from "../context/saveDataContext";
import { useRoute } from "@react-navigation/native";

const BottomRe = () => {
  const { saveData } = useSaveData();
  const windowWidth = Dimensions.get("window").width;
  const navigation = useNavigation();
  const route = useRoute(); // 현재 라우트 정보를 가져옴
  const [selectedIcon, setSelectedIcon] = useState("Spending");

  let homeImageSource = require("../assets/logo/default.png");

  if (saveData.isLoaded) {
    if (saveData.progress <= 20) {
      homeImageSource = require("../assets/logo/bad.png");
    } else if (saveData.progress <= 49) {
      homeImageSource = require("../assets/logo/moderate.png");
    } else if (saveData.progress <= 100) {
      homeImageSource = require("../assets/logo/good.png");
    }
  }

  // 아이콘 이미지 소스 설정
  const friendsImageSource =
    selectedIcon === "FriendsList"
      ? require("../assets/friendsClick.png")
      : require("../assets/friends.png");
  const communityImageSource =
    selectedIcon === "Community"
      ? require("../assets/communityClick.png")
      : require("../assets/community.png");
  const imageSource =
    selectedIcon === "MyPage"
      ? require("../assets/profileClick.png")
      : require("../assets/profile.png");

  const toggleIcons = (iconName) => {
    if (selectedIcon !== iconName) {
      setSelectedIcon(iconName);
      // 현재 화면과 다르면 네비게이션 실행
      if (route.name !== iconName) {
        navigation.replace(iconName);
      }
    }
  };

  // default 아이콘 선택 값
  useEffect(() => {
    if (!selectedIcon) {
      setSelectedIcon("Spending");
    }
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          {["Spending", "Community", "FriendsList", "MyPage"].map(
            (iconName, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                style={styles.menuItem}
                onPress={() => toggleIcons(iconName)}
              >
                <View
                  style={[
                    styles.iconBg,
                    selectedIcon === iconName && styles.selectedIconContainer,
                  ]}
                >
                  <Image
                    style={styles.icon}
                    source={
                      iconName === "Spending"
                        ? homeImageSource
                        : iconName === "Community"
                        ? communityImageSource
                        : iconName === "FriendsList"
                        ? friendsImageSource
                        : imageSource
                    }
                  />
                </View>
                <Text style={styles.menuText}>
                  {iconName === "Spending"
                    ? "홈"
                    : iconName === "Community"
                    ? "커뮤니티"
                    : iconName === "FriendsList"
                    ? "친구"
                    : "마이페이지"}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopColor: "#fff",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    bottom: 0,
    position: "absolute",
    width: "100%",
  },
  menuContainer: {
    flexDirection: "row",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1.5,
    borderColor: "#1F1F1F",
    justifyContent: "space-around",
    paddingBottom: 24,
    paddingTop: 16,
    height: 100,
  },
  menuText: {
    fontSize: 10,
    fontFamily: "SUITE",
    color: "#1F1F1F",
    textAlign: "center",
    marginTop: 4,
  },
  icon: {
    height: 24,
    width: 24,
  },
  selectedIconContainer: {
    backgroundColor: "#5C5C5C",
    padding: 6,
    borderRadius: 8,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    // left: 0,
    // right: 0,
    zIndex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1.5,
    borderColor: "#1F1F1F",
    borderTopColor: "#fff",
    backgroundColor: "#FFF",
  },
  iconClick: {
    width: 36,
    height: 36,
  },
  iconBg: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomRe;
