import { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Bar from "../components/Bar";

const Statistics = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 116,
            marginTop: 25,
            marginBottom: 12,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 700, color: "#1F1F1F" }}>
            지출 통계
          </Text>
          <Text style={{ fontSize: 20, fontWeight: 700, color: "#5C5C5C" }}>
            지출 내역
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 12 }}>
          <View
            style={{
              width: "50%",
              height: 2,
              backgroundColor: "#1F1F1F",
            }}
          />
          <View
            style={{
              width: "50%",
              height: 1.5,
              backgroundColor: "#5C5C5C",
            }}
          />
        </View>
        <Image source={require("../assets/shirt.png")} style={styles.image} />
        <Bar text={"의류"} />
        <View
          style={{
            width: "100%",
            height: 1.5,
            backgroundColor: "#1F1F1F",
          }}
        />
        <Image source={require("../assets/food.png")} style={styles.image} />
        <Bar text={"식생활"} />
        <View
          style={{
            width: "100%",
            height: 1.5,
            backgroundColor: "#1F1F1F",
          }}
        />
        <Image source={require("../assets/home.png")} style={styles.image} />
        <Bar text={"주거"} />
        <View
          style={{
            width: "100%",
            height: 1.5,
            backgroundColor: "#1F1F1F",
          }}
        />
        <Image source={require("../assets/etc.png")} style={styles.image} />
        <Bar text={"기타"} />
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
    // marginTop: 25,
    marginBottom: 40,
    // paddingLeft: 28,
    // paddingRight: 27,
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: "center",
    marginTop: 12,
  },
});

export default Statistics;
