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

const ChatList = () => {
  // const truncateText = (text) => {
  //   const maxLength = 20;
  //   return text.length > maxLength
  //     ? text.substring(0, maxLength) + "..."
  //     : text;
  // };

  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "#FFFBF6",
        height: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          marginTop: 25,
          marginBottom: 40,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#1F1F1F",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          채팅 목록
        </Text>

        <Line color={"#C1C1C1"} h={1} />
        <ScrollView>
          <View style={styles.chatSection}>
            <View style={{ flexDirection: "row", gap: 13 }}>
              <Image
                source={require("../../assets/Avatar.png")}
                style={styles.icon}
              />
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#1F1F1F",
                    marginBottom: 8,
                  }}
                >
                  민지
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#1F1F1F",
                  }}
                >
                  "뭐하고 있니"
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: "#1F1F1F",
              }}
            >
              07:09
            </Text>
          </View>
          <Line color={"#C1C1C1"} h={1} />
          <View style={styles.chatSection}>
            <View style={{ flexDirection: "row", gap: 13 }}>
              <Image
                source={require("../../assets/Avatar.png")}
                style={styles.icon}
              />
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#1F1F1F",
                      marginBottom: 8,
                    }}
                  >
                    수연
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      color: "#1F1F1F",
                    }}
                  >
                    07:09
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#1F1F1F",
                  }}
                >
                  어쩌라고 무러하ㅏ로오오오오오 오아우우오오오아아ㅁ아러망러"
                </Text>
              </View>
            </View>
            {/* <Text
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: "#1F1F1F",
              }}
            >
              07:09
            </Text> */}
          </View>
          <Line color={"#C1C1C1"} h={1} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatSection: {
    flexDirection: "row",
    paddingTop: 14,
    paddingBottom: 17,
    justifyContent: "space-between",
    paddingLeft: 13,
    paddingRight: 19,
  },
  icon: {
    width: 48,
    height: 48,
  },
});

export default ChatList;
