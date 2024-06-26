import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import RegularBtnOrange from "../../Btn/regularBtnOrange";

const ReportResult = ({
  isVisible,
  onCancel,
  result,
  reportReason,
  reportDate,
  reportUser,
  reportContent,
}) => {
  return (
    <Modal animationType="none" transparent={true} visible={isVisible}>
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
              신고 결과
            </Text>
            {result === "거절" ? (
              <Text style={[styles.text]}>
                운영 원칙에 어긋나지 않는다고{"\n"}
                판단되어 경고를 보내지 않았습니다.{"\n"}
                깨끗한 커뮤니티 이용을 위해{"\n"}
                힘써주셔서 감사합니다!
              </Text>
            ) : (
              <Text style={[styles.text]}>
                작성자에게 경고를 보냈습니다.{"\n"}
                깨끗한 커뮤니티 이용을 위해{"\n"}
                힘써주셔서 감사합니다!
              </Text>
            )}
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
                <Text style={[styles.contentTitle]}>신고 일자</Text>
                <Text style={[styles.contentText]}>{reportDate}</Text>
              </View>
              <View style={{ flexDirection: "column", gap: 5 }}>
                <Text style={[styles.contentTitle]}>
                  신고 대상 (작성자 닉네임)
                </Text>
                <Text style={[styles.contentText]}>{reportUser}</Text>
              </View>
              <View style={{ flexDirection: "column", gap: 5 }}>
                <Text style={[styles.contentTitle]}>신고 내용</Text>
                <Text
                  style={[styles.contentText]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {reportContent}
                </Text>
              </View>
              <View style={{ flexDirection: "column", gap: 5 }}>
                <Text style={[styles.contentTitle]}>신고 사유</Text>
                <Text
                  style={[styles.contentText]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {reportReason}
                </Text>
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

export default ReportResult;
