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
import { useNavigation } from "@react-navigation/native";

// const Bottom = ({ navigation }) => {
const Bottom = () => {
  const navigation = useNavigation();
  const [leftIconVisible, setLeftIconVisible] = useState(false);
  const [rightIconVisible, setRightIconVisible] = useState(false);

  const toggleIcons = () => {
    setLeftIconVisible(!leftIconVisible);
    setRightIconVisible(!rightIconVisible);
  };

  const rotateRightIcon = () => {
    Animated.sequence([
      Animated.timing(rightIconRotation, {
        toValue: 45,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(rightIconRotation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          gap: 40,
          bottom: 130,
          alignSelf: "center",
        }}
      >
        {leftIconVisible && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("Login")}
          >
            <Image
              source={require("../assets/lefrBtn.png")}
              style={{ width: 64, height: 80 }}
            />
          </TouchableOpacity>
        )}
        {rightIconVisible && (
          <TouchableOpacity activeOpacity={1}>
            <Image
              source={require("../assets/rightBtn.png")}
              style={{ width: 64, height: 80 }}
            />
          </TouchableOpacity>
        )}
      </View>
      <ImageBackground
        source={require("../assets/bottom.png")}
        style={styles.container}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.menuItem}
          onPress={() => navigation.navigate("Note")}
        >
          <Image
            source={require("../assets/community.png")}
            style={styles.icon}
          />
          <Text style={styles.menuText}>커뮤니티</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.menuItem}
          onPress={() => navigation.navigate("Statistics")}
        >
          <Image
            source={require("../assets/message.png")}
            style={styles.icon}
          />
          <Text style={styles.menuText}>대화</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.menuItem}
          onPress={toggleIcons}
        >
          <Image
            source={require("../assets/bottomIcon.png")}
            style={{ width: 64, height: 64, top: -50 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.menuItem}
          onPress={() => navigation.navigate("FriendsList")}
        >
          <Image
            source={require("../assets/friends.png")}
            style={styles.icon}
          />
          <Text style={styles.menuText}>친구</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.menuItem}
          onPress={() => navigation.navigate("FriendsList")} // 마이페이지 스크린으로 이동
        >
          <Image
            source={require("../assets/profile.png")}
            style={styles.icon}
          />
          <Text style={styles.menuText}>마이페이지</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFBF6",
    height: 110,
    width: "100%",
  },
  menuItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuText: {
    fontSize: 10,
    fontWeight: "500",
    color: "#1F1F1F",
    textAlign: "center",
  },
  icon: {
    height: 24,
    width: 24,
  },
});

export default Bottom;
