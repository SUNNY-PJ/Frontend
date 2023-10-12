import React, { useState, useEffect } from "react";
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
  const [iconVisible, setIconVisible] = useState(false);

  const [selectedIcon, setSelectedIcon] = useState("Note");

  const toggleIcons = (iconName) => {
    if (selectedIcon !== iconName) {
      setSelectedIcon(iconName);
    }
  };

  const handleMainIcon = () => {
    setIconVisible(!iconVisible);
  };

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
      >
        {iconVisible && (
          <View style={{ flexDirection: "row", gap: 40 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate("Login")}
            >
              <Image
                source={require("../assets/lefrBtn.png")}
                style={{ width: 64, height: 80 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate("Community")}
            >
              <Image
                source={require("../assets/rightBtn.png")}
                style={{ width: 64, height: 80 }}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ImageBackground
        source={require("../assets/bottom.png")}
        style={styles.container}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.menuItem,
            selectedIcon === "Note" && styles.selectedIconContainer,
          ]}
          onPress={() => {
            toggleIcons("Note");
            navigation.navigate("Note");
          }}
        >
          <Image
            source={require("../assets/community.png")}
            style={styles.icon}
          />
          <Text style={styles.menuText}>커뮤니티</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.menuItem,
            selectedIcon === "ApiTest" && styles.selectedIconContainer,
          ]}
          onPress={() => {
            toggleIcons("ApiTest");
            navigation.navigate("ApiTest");
          }}
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
          onPress={handleMainIcon}
        >
          <Image
            source={require("../assets/bottomIcon.png")}
            style={{ width: 64, height: 64, top: -40, left: 5 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.menuItem,
            selectedIcon === "FriendsList" && styles.selectedIconContainer,
          ]}
          onPress={() => {
            toggleIcons("FriendsList");
            navigation.navigate("FriendsList");
          }}
        >
          <Image
            source={require("../assets/friends.png")}
            style={styles.icon}
          />
          <Text style={styles.menuText}>친구</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.menuItem,
            selectedIcon === "Spending" && styles.selectedIconContainer,
          ]}
          onPress={() => {
            toggleIcons("Spending");
            navigation.navigate("Spending");
          }}
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
    bottom: -10,
    // right: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFBF6",
    height: 110,
    width: "100%",
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
    marginTop: 10,
  },
  icon: {
    height: 24,
    width: 24,
  },
  selectedIconContainer: {
    backgroundColor: "#6ADCA3",
    // padding: 6,
    borderRadius: 8,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

export default Bottom;
