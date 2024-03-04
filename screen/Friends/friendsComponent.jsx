import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { proxyUrl } from "../../constant/common";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Line from "../../components/Line";
import { useNavigation } from "@react-navigation/native";

const FriendsComponent = ({ Data, onAddFriend }) => {
  const navigation = useNavigation();

  const handleBattle = (friendsId, name) => {
    navigation.navigate("MainScreen", {
      screen: "SendMatch",
      params: {
        friendsId: friendsId,
        name: name,
      },
    });
  };

  return (
    <ScrollView>
      {Data.map((item) => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 28,
            paddingRight: 28,
            marginBottom: 20,
            paddingTop: 20,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                navigation.navigate("FriendProfile", {
                  screen: "FriendProfile",
                })
              }
            >
              <Image
                source={require("../../assets/Avatar.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: 8,
                fontSize: 16,
                color: "#1F1F1F",
                alignSelf: "center",
                fontFamily: "SUITE_Medium",
              }}
            >
              {item.name}
            </Text>
          </View>
          {item.friendStatus === "BATTLE" && (
            <View style={{ flexDirection: "row", gap: 16 }}>
              {/* <TouchableOpacity activeOpacity={0.6}>
                <Image
                  source={require("../../assets/messageBlack.png")}
                  style={styles.icon}
                />
              </TouchableOpacity> */}
              <TouchableOpacity activeOpacity={0.6}>
                <Image
                  source={require("../../assets/VersusIcon.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          )}
          {item.friendStatus === "WAIT" && (
            <View style={{ flexDirection: "row", gap: 16 }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => onAddFriend(item.friendsId)}
              >
                <Image
                  source={require("../../assets/plusIcon.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          )}
          {item.friendStatus === "APPROVE" && (
            <View style={{ flexDirection: "row", gap: 16 }}>
              {/* <TouchableOpacity activeOpacity={0.6}>
                <Image
                  source={require("../../assets/messageBlack.png")}
                  style={styles.icon}
                />
              </TouchableOpacity> */}
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  handleBattle(item.friendsId, item.name);
                }}
              >
                <Image
                  source={require("../../assets/VersusIconBlack.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
      <Line color={"#C1C1C1"} h={2} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 8,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#1F1F1F",
    textAlign: "center",
    marginBottom: 24,
    fontFamily: "SUITE_Bold",
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: "#1F1F1F",
  },
  menuItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 40,
    width: 40,
  },
});

export default FriendsComponent;
