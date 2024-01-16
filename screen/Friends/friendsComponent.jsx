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

const FriendsComponent = ({ status }) => {
  const navigation = useNavigation();
  const inputURL = "/api/v1/friends";
  const url = proxyUrl + inputURL;

  const [approveData, setApproveData] = useState();
  const [waitData, setWaitData] = useState();

  const fetchData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    console.log(access_token);

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });
      const Data = response.data.data;
      console.log("친구 데이터:::", Data);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("친구 목록");
  }, [status]);

  return (
    <ScrollView>
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
              fontWeight: 500,
              color: "#1F1F1F",
              alignSelf: "center",
            }}
          >
            친구1
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <TouchableOpacity activeOpacity={0.6}>
            <Image
              source={require("../../assets/messageBlack.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6}>
            <Image
              source={require("../../assets/VersusIcon.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
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
