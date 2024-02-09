import React, { useState, useEffect } from "react";
import { proxyUrl } from "../../constant/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Line from "../../components/Line";
import Modal from "react-native-modal";
import CommentActionSheet from "../../components/BottomSheet/commentActionSheet";
import CommentViewerActionSheet from "../../components/BottomSheet/commentViewerActionSheet";

const Comment = ({ isCommentModal, commentModal, communityId }) => {
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();

  const inputURL = `/comment/${communityId}`;
  const url = proxyUrl + inputURL;
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [childrenCommentData, setChildrenCommentData] = useState([]);
  const [secret, setSecret] = useState(false);
  const [parentId, setParentId] = useState("");
  const [parentWriter, setParentWriter] = useState("");
  const [isActionSheetVisible, setActionSheetVisible] = useState(false);

  console.log(communityId);

  const imageSource = secret
    ? require("../../assets/secretComment_checkBoxTrue.png")
    : require("../../assets/secretComment_checkBox.png");

  const handleCommentChange = (text) => {
    setComment(text);
    console.log(comment);
  };

  const handleSecretClick = () => {
    setSecret(!secret);
    console.log(secret);
  };

  const handleReCommentClick = (parentId, parentIdWriter) => {
    setComment(`@${parentIdWriter} `);
    setParentId(parentId);
    console.log("대댓글", comment);
  };

  // 댓글 조회
  const fetchData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    console.log(access_token);

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });

      const ResCommentData = response.data.data;
      console.log("????", response.data);

      setCommentData(ResCommentData);
      console.log("????", ResCommentData);
      const ChildrenCommentData = commentData.map((item) => item.children);
      setChildrenCommentData(ChildrenCommentData);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  // 댓글 등록
  const postData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    console.log(access_token);

    // const isReply = comment.startsWith("@");

    bodyData = {
      content: comment,
      // parent_id: isReply ? comment.split(" ")[0].substring(1) : null,
      parent_id: parentId ? parentId : null,
      is_privated: secret,
    };

    try {
      const response = await axios.post(url, bodyData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (response.status === 200) {
        alert("댓글을 등록하였습니다.");
        fetchData();
      }
      console.log("데이터:", response.data);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  // 댓글 삭제
  const deleteData = async () => {
    const inputURL = `/comment/${commentId}`;
    const url = proxyUrl + inputURL;
    const access_token = await AsyncStorage.getItem("access_token");

    try {
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (response.status === 200) {
        alert("댓글을 삭제하였습니다.");
        fetchData(); // 댓글 목록을 다시 불러옵니다.
      }
      console.log("데이터:", response.data);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const handlePostComment = () => {
    postData();
    setComment("");
    console.log(comment);
  };

  const handleMenuClick = (id, writer) => {
    console.log(id);
    setCommentId(id);
    setParentWriter(writer);
    setActionSheetVisible(true);
  };

  const handleRemoveClick = () => {
    console.log(commentId);
    deleteData();
    setActionSheetVisible(false);
  };

  const handleCommentClick = () => {
    setActionSheetVisible(false);
    setComment(`@${parentWriter} `);
    setParentId(commentId);
  };

  const handleProfileClick = () => {
    setActionSheetVisible(false);
  };

  const handleModifyClick = () => {
    setActionSheetVisible(false);
  };

  const handleReportClick = () => {
    setActionSheetVisible(false);
    navigation.navigate("MainScreen", { screen: "Report" });
  };

  useEffect(() => {
    fetchData();
  }, [commentId]);

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
          {commentData?.map((item) => (
            <View style={styles.commentSection} key={item.id}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 8,
                  }}
                >
                  <Image
                    source={require("../../assets/myPage_profile.png")}
                    style={{ width: 32, height: 32 }}
                  />
                  <Text style={[styles.comment, { alignSelf: "center" }]}>
                    {item.writer}
                  </Text>
                  {item.author === true ? (
                    <View
                      style={{
                        backgroundColor: "#6ADCA3",
                        borderRadius: 12,
                        alignSelf: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "#1F1F1F",
                          fontSize: 10,
                          fontWeight: 500,
                          paddingRight: 5,
                          paddingLeft: 5,
                          paddingTop: 4,
                          paddingBottom: 4,
                        }}
                      >
                        작성자
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => handleMenuClick(item.id, item.writer)}
                  >
                    <Image
                      source={require("../../assets/commentDotMenu.png")}
                      style={{ width: 20, height: 4, top: 10 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={[styles.comment, { paddingLeft: 40 }]}>
                {item.content}
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
                <Text style={styles.subComment}>{item.createdDate}</Text>
                <Text
                  style={styles.subComment}
                  onPress={() => handleReCommentClick(item.id, item.writer)}
                >
                  답글 쓰기
                </Text>
              </View>
              <Line color={"#E8E9E8"} h={1} />
              {/* 대댓글 ui */}
              {item.children.length > 0 && (
                <View>
                  {item.children.map((childItem) => (
                    <View key={childItem.id}>
                      <View
                        style={{
                          flexDirection: "row",
                          paddingLeft: 40,
                          marginTop: 9,
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 8,
                          }}
                        >
                          <Image
                            source={require("../../assets/myPage_profile.png")}
                            style={{ width: 32, height: 32 }}
                          />
                          <Text
                            style={[styles.comment, { alignSelf: "center" }]}
                          >
                            {childItem.writer}
                          </Text>
                          {childItem.author === true ? (
                            <View
                              style={{
                                backgroundColor: "#6ADCA3",
                                borderRadius: 12,
                                alignSelf: "center",
                              }}
                            >
                              <Text
                                style={{
                                  color: "#1F1F1F",
                                  fontSize: 10,
                                  fontWeight: 500,
                                  paddingRight: 5,
                                  paddingLeft: 5,
                                  paddingTop: 4,
                                  paddingBottom: 4,
                                }}
                              >
                                작성자
                              </Text>
                            </View>
                          ) : null}
                        </View>
                        <View>
                          <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() =>
                              handleMenuClick(childItem.id, childItem.writer)
                            }
                          >
                            <Image
                              source={require("../../assets/commentDotMenu.png")}
                              style={{ width: 20, height: 4, top: 10 }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <Text style={[styles.comment, { paddingLeft: 80 }]}>
                        {childItem.content}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 8,
                          paddingLeft: 80,
                          marginTop: 4,
                          marginBottom: 21,
                        }}
                      >
                        <Text style={styles.subComment}>
                          {childItem.createdDate}
                        </Text>
                      </View>
                      <Line color={"#E8E9E8"} h={1} />
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
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
            />
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: comment ? "#FFA851" : "#FFFBF6" },
              ]}
              onPress={handlePostComment}
              disabled={!comment}
            >
              <Text style={styles.buttonText}>등록</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      {/* <CommentActionSheet
        isVisible={isActionSheetVisible}
        onClose={() => setActionSheetVisible(false)}
        onRemove={handleRemoveClick}
        onComment={handleCommentClick}
        onModify={handleModifyClick}
        onProfile={handleProfileClick}
      /> */}
      <CommentViewerActionSheet
        isVisible={isActionSheetVisible}
        onClose={() => setActionSheetVisible(false)}
        onReport={handleReportClick}
        onComment={handleCommentClick}
        onProfile={handleProfileClick}
      />
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
