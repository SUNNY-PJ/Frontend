import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Line from "../../components/Line";
import Modal from "react-native-modal";

const Comment = ({ isCommentModal, commentModal }) => {
  const [comment, setComment] = useState("");
  const [secret, setSecret] = useState(false);

  const imageSource = secret
    ? require("../../assets/secretComment_checkBoxTrue.png")
    : require("../../assets/secretComment_checkBox.png");

  const handleCommentChange = (text) => {
    setComment(text);
    console.log(comment);
  };

  const handleButtonClick = () => {
    alert("등록");
    setComment("");
    console.log(comment);
  };

  const handleSecretClick = () => {
    setSecret(!secret);
    console.log(secret);
  };

  return (
    <Modal
      isVisible={isCommentModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onSwipeComplete={commentModal}
      swipeDirection="down"
      style={styles.modal}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        <View
          style={{
            width: 64,
            height: 4,
            backgroundColor: "#C1C1C1",
            alignSelf: "center",
            borderRadius: 12,
            marginBottom: 37,
          }}
        />
        <View style={styles.modalContent}>
          <Line color={"#E8E9E8"} h={2} />
          <View style={styles.commentSection}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Image
                source={require("../../assets/myPage_profile.png")}
                style={{ width: 32, height: 32 }}
              />
              <Text style={[styles.comment, { alignSelf: "center" }]}>
                닉네임
              </Text>
            </View>
            <Text style={[styles.comment, { paddingLeft: 40 }]}>
              댓글 내용임니다아ㅏ아ㅏㅏ아
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                paddingLeft: 40,
                marginTop: 4,
                marginBottom: 21,
              }}
            >
              <Text style={styles.subComment}>2023.09.08 04:05</Text>
              <Text style={styles.subComment}>답글 쓰기</Text>
            </View>
            <Line color={"#E8E9E8"} h={1} />
            <View style={{ flexDirection: "row", gap: 8, marginTop: 9 }}>
              <Image
                source={require("../../assets/myPage_profile.png")}
                style={{ width: 32, height: 32 }}
              />
              <Text style={[styles.comment, { alignSelf: "center" }]}>
                닉네임
              </Text>
            </View>

            <Text style={[styles.comment, { paddingLeft: 40 }]}>
              댓글 내용임니다아ㅏ아ㅏㅏ아
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                paddingLeft: 40,
                marginTop: 4,
                marginBottom: 21,
              }}
            >
              <Text style={styles.subComment}>2023.09.08 04:05</Text>
              <Text style={styles.subComment}>답글 쓰기</Text>
            </View>
          </View>
          <Line color={"#E8E9E8"} h={2} />
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleSecretClick}
            style={styles.secretCommentSection}
          >
            <Text style={styles.secretComment}>비밀 댓글</Text>
            <Image
              source={imageSource}
              style={{ width: 8, height: 8, alignSelf: "center" }}
            />
          </TouchableOpacity>
          <View style={styles.keyboard}>
            <TextInput
              placeholder={"댓글을 남겨보세요"}
              placeholderTextColor="#5C5C5C"
              value={comment}
              onChangeText={handleCommentChange}
              style={styles.input}
              // onFocus={handleFocus}
              // onBlur={handleBlur}
            />
            <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
              <Text style={[styles.buttonText, {}]}>등록</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 28,
    paddingTop: 20,
  },
  commentSection: { paddingLeft: 17, paddingRight: 17 },
  modalContent: {
    marginBottom: 24,
    gap: 8,
  },
  input: {
    height: 30,
    borderRadius: 9,
    borderColor: "transparent",
    borderWidth: 1.5,
    width: "84%",
  },
  keyboard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 42,
    borderRadius: 9,
    borderColor: "#E8E9E8",
    borderWidth: 1.5,
    paddingLeft: 16,
    paddingRight: 16,
  },
  button: {
    borderRadius: 8,
    borderColor: "#1F1F1F",
    backgroundColor: "#FFA851",
    borderWidth: 1,
    color: "#000",
    // width: 40,
    // height: 27,
  },
  buttonText: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    fontSize: 12,
    fontWeight: 700,
    color: "#1F1F1F",
  },
  comment: { fontSize: 15, fontWeight: 500, color: "#1F1F1F" },
  subComment: { fontSize: 10, fontWeight: 500, color: "#C1C1C1" },
  secretCommentSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 3,
  },
  secretComment: { color: "#5C5C5C", fontSize: 10, fontWeight: 700 },
});

export default Comment;
