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

const Board = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 16,
            paddingRight: 24,
            marginTop: 17,
            marginBottom: 18,
          }}
        >
          <View style={{ flexDirection: "row", gap: 3 }}>
            <Image
              source={require("../../assets/sort.png")}
              style={{
                width: 20,
                height: 20,
              }}
            />
            <Text
              style={{
                color: "#262626",
                fontSize: 15,
                fontWeight: 500,
                alignSelf: "center",
              }}
            >
              최신순
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 22,
            }}
          >
            <Image
              source={require("../../assets/search.png")}
              style={{
                width: 20,
                height: 20,
              }}
            />
            <Image
              source={require("../../assets/write.png")}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </View>
        </View>
        <View style={styles.tabBar}>
          <View style={styles.tabBarLine} />
        </View>
        <View>
          <Text style={{ fontSize: 20, color: "#000", fontWeight: 500 }}>
            test
          </Text>
        </View>
        <View style={styles.tabBar}>
          <View style={styles.tabBarLine} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  contentContainer: {
    marginBottom: 40,
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: "center",
    marginTop: 12,
  },
  tabBar: {
    flexDirection: "row",
    marginBottom: 12,
  },
  tabBarLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#C1C1C1",
  },
});

export default Board;
