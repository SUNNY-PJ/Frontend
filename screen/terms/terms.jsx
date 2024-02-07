import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TermsData } from "../../data/termsData";

const Terms = () => {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MyPage", {
              screen: "MyPage",
            })
          }
        >
          <Image
            source={require("../../assets/prevBtn.png")}
            style={{ width: 24, height: 24, marginTop: 16 }}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 16,
          color: "#1F1F1F",
          fontWeight: 700,
          alignSelf: "center",
          bottom: 17,
        }}
      >
        이용약관
      </Text>
      <ScrollView style={{ marginBottom: 200 }}>
        {TermsData.map((item, index) => (
          <View key={index} style={styles.section}>
            {item.title && (
              <Text
                style={{
                  fontSize: 15,
                  color: "#1F1F1F",
                  fontWeight: 700,
                  marginTop: 10,
                }}
              >
                {item.title}
              </Text>
            )}
            {item.text && (
              <Text style={{ fontSize: 12, color: "#1F1F1F", fontWeight: 500 }}>
                {item.text}
              </Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  section: {
    paddingRight: 20,
    paddingLeft: 20,
    gap: 3,
  },
  screenTitle: {
    fontSize: 16,
    color: "#1F1F1F",
    fontWeight: 700,
    alignSelf: "center",
    bottom: 17,
  },
  termsTitle: {
    fontSize: 15,
    color: "#1F1F1F",
    fontWeight: 700,
  },
  termsText: {
    fontSize: 12,
    color: "#1F1F1F",
    fontWeight: 500,
  },
});

export default Terms;
