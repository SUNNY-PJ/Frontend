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

const BottomRe = () => {
  const windowWidth = Dimensions.get("window").width;
  const navigation = useNavigation();
  const [selectedIcon, setSelectedIcon] = useState("Note");

  const imageSource =
    selectedIcon === "MyPage"
      ? require("../assets/profileClick.png")
      : require("../assets/profile.png");

  const friendsImageSource =
    selectedIcon === "FriendsList"
      ? require("../assets/friendsClick.png")
      : require("../assets/friends.png");

  const homeImageSource =
    selectedIcon === "Home"
      ? require("../assets/bottomHome.png")
      : require("../assets/bottomHome.png");

  const communityImageSource =
    selectedIcon === "Community"
      ? require("../assets/communityClick.png")
      : require("../assets/community.png");

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
    <>
      <View
        style={{
          borderTopColor: "#fff",
          backgroundColor: "#FFF",
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
            paddingBottom: 25,
            paddingTop: 10,
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.menuItem]}
            onPress={() => {
              toggleIcons("Statistics");
              navigation.navigate("Statistics");
            }}
          >
            <View
              style={[
                styles.iconBg,
                selectedIcon === "Statistics" && styles.selectedIconContainer,
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
        </View>
      </View>
    </>
    // <View style={styles.bottomContainer}>
    //   <View style={{ flexDirection: "row" }}>
    //     <TouchableOpacity
    //       activeOpacity={1}
    //       style={[styles.menuItem]}
    //       onPress={() => {
    //         toggleIcons("Community");
    //         navigation.navigate("Community");
    //       }}
    //     >
    //       <View
    //         style={[
    //           styles.iconBg,
    //           selectedIcon === "Community" && styles.selectedIconContainer,
    //         ]}
    //       >
    //         <Image style={styles.icon} source={communityImageSource} />
    //       </View>
    //       <Text style={styles.menuText}>커뮤니티</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       activeOpacity={1}
    //       style={[styles.menuItem]}
    //       onPress={() => {
    //         toggleIcons("Message");
    //         navigation.navigate("ChatList");
    //       }}
    //     >
    //       <View
    //         style={[
    //           styles.iconBg,
    //           selectedIcon === "Message" && styles.selectedIconContainer,
    //         ]}
    //       >
    //         <Image style={styles.icon} source={messageImageSource} />
    //       </View>
    //       <Text style={styles.menuText}>대화</Text>
    //     </TouchableOpacity>
    //     {/* 중앙 아이콘 */}
    //     {/* <TouchableOpacity
    //       activeOpacity={1}
    //       style={styles.menuItem}
    //       // onPress={handleMainIcon}
    //       onPress={() => {
    //         setSelectedIcon(null);
    //         navigation.navigate("Spending");
    //       }}
    //     >
    //       <Image
    //         source={require("../assets/bottomIcon.png")}
    //         style={{ width: 64, height: 64, top: -40, left: 5 }}
    //       />
    //     </TouchableOpacity> */}
    //     <TouchableOpacity
    //       activeOpacity={1}
    //       style={[styles.menuItem]}
    //       onPress={() => {
    //         toggleIcons("FriendsList");
    //         navigation.navigate("FriendsList");
    //       }}
    //     >
    //       <View
    //         style={[
    //           styles.iconBg,
    //           selectedIcon === "FriendsList" && styles.selectedIconContainer,
    //         ]}
    //       >
    //         <Image style={styles.icon} source={friendsImageSource} />
    //       </View>
    //       <Text style={styles.menuText}>친구</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       activeOpacity={1}
    //       style={[styles.menuItem]}
    //       onPress={() => {
    //         toggleIcons("MyPage");
    //         navigation.navigate("MyPage");
    //       }}
    //     >
    //       <View
    //         style={[
    //           styles.iconBg,
    //           selectedIcon === "MyPage" && styles.selectedIconContainer,
    //         ]}
    //       >
    //         <Image style={styles.icon} source={imageSource} />
    //       </View>
    //       <Text style={styles.menuText}>마이페이지</Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>
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
    fontWeight: "500",
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
