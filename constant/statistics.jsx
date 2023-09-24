import { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Bar from "../components/Bar";

const Statistics = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
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
    marginBottom: 40,
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: "center",
    marginTop: 12,
  },
});

export default Statistics;
