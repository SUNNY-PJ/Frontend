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
import FriendsComponent from "./friendsComponent";

function FriendsList() {
  const navigation = useNavigation();

  const [isFriendsComponentVisible1, setIsFriendsComponentVisible1] =
    useState(true);
  const [isFriendsComponentVisible2, setIsFriendsComponentVisible2] =
    useState(true);
  const [isFriendsComponentVisible3, setIsFriendsComponentVisible3] =
    useState(true);

  const toggleFriendsComponent1 = () => {
    setIsFriendsComponentVisible1((prev) => !prev);
  };
  const toggleFriendsComponent2 = () => {
    setIsFriendsComponentVisible2((prev) => !prev);
  };
  const toggleFriendsComponent3 = () => {
    setIsFriendsComponentVisible3((prev) => !prev);
  };

  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "#FFFBF6",
        minHeight: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          marginTop: 25,
          marginBottom: 40,
        }}
      >
        <Text style={styles.mainTitle}>친구 목록</Text>

        {/* 대결 중인 친구 목록 */}
        <TouchableOpacity onPress={toggleFriendsComponent1} activeOpacity={1}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>대결 중인 친구</Text>
            <Image
              source={require("../../assets/arrowUp.png")}
              style={{
                width: 24,
                height: 24,
                transform: [
                  { rotate: isFriendsComponentVisible1 ? "0deg" : "180deg" },
                ],
              }}
            />
          </View>
        </TouchableOpacity>
        {isFriendsComponentVisible1 ? (
          <Line color={"#C1C1C1"} h={2} />
        ) : (
          <Line color={"#1F1F1F"} h={2} />
        )}
        {isFriendsComponentVisible1 && <FriendsComponent status={""} />}
        {/* 친구 신청 목록 */}
        <TouchableOpacity onPress={toggleFriendsComponent2} activeOpacity={1}>
          <View style={{ ...styles.titleSection, paddingTop: 24 }}>
            <Text style={styles.title}>친구 신청</Text>
            <Image
              source={require("../../assets/arrowUp.png")}
              style={{
                width: 24,
                height: 24,
                transform: [
                  { rotate: isFriendsComponentVisible2 ? "0deg" : "180deg" },
                ],
              }}
            />
          </View>
        </TouchableOpacity>
        {isFriendsComponentVisible2 ? (
          <Line color={"#C1C1C1"} h={2} />
        ) : (
          <Line color={"#1F1F1F"} h={2} />
        )}
        {isFriendsComponentVisible2 && <FriendsComponent status={"WAIT"} />}

        {/* 친구 목록 */}
        <TouchableOpacity onPress={toggleFriendsComponent3} activeOpacity={1}>
          <View style={{ ...styles.titleSection, paddingTop: 24 }}>
            <Text style={styles.title}>친구</Text>
            <Image
              source={require("../../assets/arrowUp.png")}
              style={{
                width: 24,
                height: 24,
                transform: [
                  { rotate: isFriendsComponentVisible3 ? "0deg" : "180deg" },
                ],
              }}
            />
          </View>
        </TouchableOpacity>
        {isFriendsComponentVisible3 ? (
          <Line color={"#C1C1C1"} h={2} />
        ) : (
          <Line color={"#1F1F1F"} h={2} />
        )}
        {isFriendsComponentVisible3 && <FriendsComponent status={"APPROVE"} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 16,
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

export default FriendsList;
