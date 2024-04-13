import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const TopTooltip = ({ openTopTooltip }) => {
  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity onPress={openTopTooltip} activeOpacity={1}>
        <ImageBackground
          source={require("../../assets/topTooltip.png")}
          style={{ width: 139, height: 48 }}
        >
          <Image
            source={require("../../assets/close.png")}
            style={{
              width: 8,
              height: 8,
              alignSelf: "flex-end",
              marginRight: 12,
              top: 12,
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          />
          <Text
            style={{
              fontSize: 12,
              fontFamily: "SUITE",
              color: "#1F1F1F",
              marginLeft: 12,
              marginTop: 2,
            }}
          >
            여기를 눌러 절약{"\n"}
            목표를 설정해 보세요!{"\n"}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: -5,
    left: 17,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TopTooltip;
