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

const BottomRe = () => {
  const { saveData } = useSaveData();
  const windowWidth = Dimensions.get("window").width;
  const navigation = useNavigation();
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
      <View
        style={{
          borderTopColor: "#fff",
          backgroundColor: "#FFF",
          // backgroundColor: "#FFFBF6",
          derTopLeftRadius: 24,
          borderTopRightRadius: 24,
          bottom: 0,
          position: "absolute",
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            borderWidth: 1.5,
            borderColor: "#1F1F1F",
            justifyContent: "space-around",
            paddingBottom: 24,
            paddingTop: 16,
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.menuItem]}
            onPress={() => {
              toggleIcons("Spending");
              navigation.replace("Spending");
            }}
          >
            <View
              style={[
                styles.iconBg,
                selectedIcon === "Spending" && styles.selectedIconContainer,
              ]}
            >
              <Image style={styles.icon} source={homeImageSource} />
            </View>
            <Text style={styles.menuText}>홈</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.menuItem]}
            onPress={() => {
              toggleIcons("Community");
              navigation.replace("Community");
            }}
          >
            <View
              style={[
                styles.iconBg,
                selectedIcon === "Community" && styles.selectedIconContainer,
              ]}
            >
              <Image style={styles.icon} source={communityImageSource} />
            </View>
            <Text style={styles.menuText}>커뮤니티</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.menuItem]}
            onPress={() => {
              toggleIcons("FriendsList");
              navigation.replace("FriendsList");
            }}
          >
            <View
              style={[
                styles.iconBg,
                selectedIcon === "FriendsList" && styles.selectedIconContainer,
              ]}
            >
              <Image style={styles.icon} source={friendsImageSource} />
            </View>
            <Text style={styles.menuText}>친구</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.menuItem]}
            onPress={() => {
              toggleIcons("MyPage");
              navigation.replace("MyPage");
            }}
          >
            <View
              style={[
                styles.iconBg,
                selectedIcon === "MyPage" && styles.selectedIconContainer,
              ]}
            >
              <Image style={styles.icon} source={imageSource} />
            </View>
            <Text style={styles.menuText}>마이페이지</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: -10,
    // right: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFBF6",
    height: 110,
  },
  menuItem: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 11,
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
