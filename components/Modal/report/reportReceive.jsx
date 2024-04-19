import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import RegularBtnOrange from "../../Btn/regularBtnOrange";

const ReportReceive = ({
  isVisible,
  onCancel,
  count,
  date,
  content,
  reason,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          height: "100%",
        }}
      >
        <View style={styles.container}>
          <View
            style={{
              justifyContent: "center",
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <Text style={[styles.title, { marginTop: 30, marginBottom: 30 }]}>
              경고 안내
            </Text>
            <Text style={[styles.text]}>
              {count}번째 경고를 받았습니다.{"\n"}
              경고 5회 누적 시 탈퇴 처리됩니다.
            </Text>

            <View
              style={{
                height: 1,
                backgroundColor: "#C1C1C1",
                width: 80,
                alignSelf: "center",
                marginTop: 20,
                marginBottom: 20,
              }}
            />
            <View style={{ flexDirection: "column", gap: 15 }}>
              <View style={{ flexDirection: "column", gap: 5 }}>
                <Text style={[styles.contentTitle]}>경고 일자</Text>
                <Text style={[styles.contentText]}>{date}</Text>
              </View>
              <View style={{ flexDirection: "column", gap: 5 }}>
                <Text style={[styles.contentTitle]}>경고 해당 내용</Text>
                <Text style={[styles.contentText]}>{content}</Text>
              </View>
              <View style={{ flexDirection: "column", gap: 5 }}>
                <Text style={[styles.contentTitle]}>경고 사유</Text>
                <Text style={[styles.contentText]}>{reason}</Text>
              </View>
            </View>
            <View style={{ marginTop: 30, marginBottom: 30 }}>
              <TouchableOpacity onPress={onCancel} activeOpacity={0.6}>
                <RegularBtnOrange text={"확인"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 315,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#1F1F1F",
    backgroundColor: "#fff",
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    color: "#000",
    fontFamily: "SUITE_Bold",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    color: "#1F1F1F",
    fontFamily: "SUITE",
  },
  btnText: {
    fontSize: 16,
    color: "#1F1F1F",
    fontFamily: "SUITE_Bold",
  },
  contentTitle: {
    fontSize: 16,
    color: "#1F1F1F",
    fontFamily: "SUITE_Bold",
  },
  contentText: {
    fontSize: 16,
    color: "#1F1F1F",
    fontFamily: "SUITE",
  },
});

export default ReportReceive;
