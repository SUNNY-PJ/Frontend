import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSaveData } from "../context/saveDataContext";

const Bottom = () => {
  const windowWidth = Dimensions.get("window").width;
  const navigation = useNavigation();
  const { saveData } = useSaveData();
  const [selectedIcon, setSelectedIcon] = useState("Note");

  const imageSource =
    selectedIcon === "MyPage"
      ? require("../assets/profileClick.png")
      : require("../assets/profile.png");

  const friendsImageSource =
    selectedIcon === "FriendsList"
      ? require("../assets/friendsClick.png")
      : require("../assets/friends.png");

  const messageImageSource =
    selectedIcon === "Message"
      ? require("../assets/messageClick.png")
      : require("../assets/message.png");

  const communityImageSource =
    selectedIcon === "Community"
      ? require("../assets/communityClick.png")
      : require("../assets/community.png");

  const [homeImageSource, setHomeImageSource] = useState(
    require("../assets/logo/default.png")
  );

  useEffect(() => {
    if (saveData.isLoaded) {
      if (saveData.progress <= 20) {
        setHomeImageSource(require("../assets/logo/bad.png"));
      } else if (saveData.progress <= 49) {
        setHomeImageSource(require("../assets/logo/moderate.png"));
      } else if (saveData.progress <= 100) {
        setHomeImageSource(require("../assets/logo/good.png"));
      }
    }
  }, [saveData]);

  const toggleIcons = (iconName) => {
    if (selectedIcon !== iconName) {
      setSelectedIcon(iconName);
    }
  };

  // default 아이콘 선택 값
  useEffect(() => {
    if (!selectedIcon) {
      setSelectedIcon("Note");
    }
  }, []);

  return (
    <View style={styles.bottomContainer}>
      <View
        style={{
          flexDirection: "row",
          gap: 40,
          bottom: 130,
          alignSelf: "center",
        }}
      ></View>
      <ImageBackground
        source={require("../assets/bottom.png")}
        style={[styles.container, { width: windowWidth }]}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.menuItem]}
          onPress={() => {
            toggleIcons("Community");
            navigation.navigate("Community");
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
            toggleIcons("Message");
            navigation.navigate("ChatList");
          }}
        >
          <View
            style={[
              styles.iconBg,
              selectedIcon === "Message" && styles.selectedIconContainer,
            ]}
          >
            <Image style={styles.icon} source={messageImageSource} />
          </View>
          <Text style={styles.menuText}>대화</Text>
        </TouchableOpacity>
        {/* 중앙 아이콘 */}
        <TouchableOpacity
          activeOpacity={1}
          style={styles.menuItem}
          onPress={() => {
            setSelectedIcon("Spending");
            navigation.navigate("Spending");
          }}
        >
          <Image
            source={homeImageSource}
            style={{ width: 64, height: 64, top: -40, left: 5 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.menuItem]}
          onPress={() => {
            toggleIcons("FriendsList");
            navigation.navigate("FriendsList");
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
            navigation.navigate("MyPage");
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
      </ImageBackground>
    </View>
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
    marginBottom: 20,
  },
  menuText: {
    fontSize: 10,
    color: "#1F1F1F",
    textAlign: "center",
    marginTop: 4,
    fontFamily: "SUITE",
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
    left: 0,
    right: 0,
    zIndex: 1,
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

export default Bottom;
