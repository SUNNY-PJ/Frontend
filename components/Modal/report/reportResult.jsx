import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";

const ReportMsg = ({ isVisible, onCancel, result }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
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
            <Text style={styles.title}>신고 결과</Text>
            {result === "good" ? (
              <Text style={styles.text}>
                운영 원칙에 어긋나지 않는다고{"\n"}
                판단되어 경고를 보내지 않았습니다.{"\n"}
                깨끗한 커뮤니티 이용을 위해{"\n"}
                힘써주셔서 감사합니다!
              </Text>
            ) : (
              <Text style={styles.text}>
                작성자에게 경고를 보냈습니다.{"\n"}
                깨끗한 커뮤니티 이용을 위해{"\n"}
                힘써주셔서 감사합니다!
              </Text>
            )}
            <View
              style={{ height: 1, backgroundColor: "#C1C1C1", width: 80 }}
            />
            <View style={{ flexDirection: "column", gap: 8 }}>
              <View style={{ flexDirection: "column", gap: 5 }}>
                <Text style={styles.contentTitle}>신고 일자</Text>
                <Text style={styles.contentTitle}>0000-00-00</Text>
              </View>
              <View style={{ flexDirection: "column", gap: 5 }}>
                <Text style={styles.contentTitle}>
                  신고 대상 (작성자 닉네임)
                </Text>
                <Text style={styles.contentTitle}>닉네임</Text>
              </View>
              <View style={{ flexDirection: "column", gap: 5 }}>
                <Text style={styles.contentTitle}>신고 내용</Text>
                <Text style={styles.contentTitle}>게시글/댓글/답글 내용</Text>
              </View>
              <View style={{ flexDirection: "column", gap: 5 }}>
                <Text style={styles.contentTitle}>신고 사유</Text>
                <Text style={styles.contentTitle}>어쩌구저쩌구...</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onCancel}>
              <View
                style={{
                  width: 160,
                  height: 40,
                  borderColor: "#FFC891",
                  borderWidth: 1.5,
                  borderBottomWidth: 3,
                  borderRightWidth: 3,
                  borderRadius: 24,
                }}
              >
                <Text style={styles.btnText}>확인</Text>
              </View>
            </TouchableOpacity>
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
    fontWeight: 700,
    textAlign: "center",
    color: "#000",
  },
  text: {
    fontSize: 18,
    fontWeight: 500,
    textAlign: "center",
    color: "#1F1F1F",
  },
  btnText: {
    fontWeight: 700,
    fontSize: 16,
    color: "#1F1F1F",
  },
  contentTitle: {
    fontWeight: 700,
    fontSize: 16,
    color: "#1F1F1F",
  },
  contentText: {
    fontWeight: 500,
    fontSize: 16,
    color: "#1F1F1F",
  },
});

export default ReportMsg;
