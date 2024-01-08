import { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Bar from "../../components/Bar";

const Statistics = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.contentSection}>
          <View style={styles.section}>
            <Image
              source={require("../../assets/shirt.png")}
              style={styles.image}
            />

            <Text style={styles.text}>의류</Text>
          </View>
          <Bar text={"74,900"} />
        </View>
        <View style={styles.bar} />
        <View style={styles.contentSection}>
          <View style={styles.section}>
            <Image
              source={require("../../assets/food.png")}
              style={styles.image}
            />
            <Text style={styles.text}>식생활</Text>
          </View>
          <Bar text={"5,000"} />
        </View>
        <View style={styles.bar} />
        <View style={styles.contentSection}>
          <View style={styles.section}>
            <Image
              source={require("../../assets/home.png")}
              style={styles.image}
            />
            <Text style={styles.text}>주거</Text>
          </View>
          <Bar text={"10,000"} />
        </View>
        <View style={styles.bar} />
        <View style={styles.contentSection}>
          <View style={styles.section}>
            <Image
              source={require("../../assets/etc.png")}
              style={styles.image}
            />
            <Text style={styles.text}>기타</Text>
          </View>
          <Bar text={"200,000"} />
        </View>
        <View
          style={{ width: "100%", height: 4, backgroundColor: "#C1C1C1" }}
        />
        <View style={styles.bottomSection}>
          <View style={styles.bottomBar} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={styles.bottomText}>컨버스 운동화</Text>
            <Text style={styles.bottomPriceText}>89,000원</Text>
          </View>
        </View>
        <View style={styles.bottomSection}>
          <View style={styles.bottomBar} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={styles.bottomText}>미스치프 카고 바지</Text>
            <Text style={styles.bottomPriceText}>139,000원</Text>
          </View>
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
    // marginBottom: 40,
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: "center",
    marginTop: 12,
  },
  text: {
    color: "#1F1F1F",
    fontSize: 20,
    fontWeight: "700",
    alignSelf: "center",
  },
  contentSection: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 85,
    gap: 16,
    marginBottom: 24,
    marginTop: 12,
  },
  bar: {
    width: "100%",
    height: 1.5,
    backgroundColor: "#1F1F1F",
  },
  section: {
    gap: 4,
    alignSelf: "center",
    width: 52,
    // justifyContent: "center",
  },
  bottomSection: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 16,
    marginTop: 16,
  },
  bottomBar: {
    width: 4,
    height: 32,
    backgroundColor: "#5C5C5C",
    borderRadius: 10,
  },
  bottomText: {
    color: "#1F1F1F",
    fontSize: 16,
    fontWeight: 700,
    marginLeft: 16,
    alignSelf: "center",
  },
  bottomPriceText: {
    color: "#1F1F1F",
    fontSize: 16,
    fontWeight: 500,
    alignSelf: "center",
  },
});

export default Statistics;
