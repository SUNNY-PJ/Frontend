import React, { useState, useEffect, useRef } from "react";
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
  PanResponder,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Line from "../../components/Line";
import Modal from "react-native-modal";
import CommentActionSheet from "../../components/BottomSheet/commentActionSheet";
import CommentViewerActionSheet from "../../components/BottomSheet/commentViewerActionSheet";
import apiClient from "../../api/apiClient";
import FriendProfile from "../Friends/friendProfile";

const Comment = ({ isCommentModal, commentModal, communityId }) => {
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();

  const inputURL = `/comment/${communityId}`;
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState(0);
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [secret, setSecret] = useState(false);
  const [parentId, setParentId] = useState("");
  const [parentWriter, setParentWriter] = useState("");
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenOptionModal, setIsOpenOptionModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isChildComment, setIsChildComment] = useState(true);
  const [isActionSheetVisible, setActionSheetVisible] = useState(false);
  const [isActionSheetViewerVisible, setActionSheetViewerVisible] =
    useState(false);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 사용자가 아래로 스와이프할 때 모달 닫기
        if (gestureState.dy > 10) {
          // dy 값이 20 이상이면 아래로 스와이프한 것으로 간주
          commentModal(); // 모달 닫기 함수 호출
        }
      },
    })
  ).current;

  const imageSource = secret
    ? require("../../assets/secretComment_checkBoxTrue.png")
    : require("../../assets/secretComment_checkBox.png");

  const handleCommentChange = (text) => {
    setComment(text);
    // console.log(comment);
  };

  const handleSecretClick = () => {
    setSecret(!secret);
    // console.log(secret);
  };

  const handleReCommentClick = (parentId, parentIdWriter) => {
    setComment(`@${parentIdWriter} `);
    setParentId(parentId);
    // console.log("대댓글", comment);
  };

  // 댓글 조회
  const fetchData = async () => {
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      const ResCommentData = response.data.data;
      setCommentData(ResCommentData);
      // console.log(
      //   ResCommentData.map((item) => item.children)
      // );
      console.log("댓글 데이터", ResCommentData);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  // 댓글 등록
  const postData = async () => {
    bodyData = {
      content: comment,
      // parent_id: isReply ? comment.split(" ")[0].substring(1) : null,
      parent_id: parentId ? parentId : null,
      is_privated: secret,
    };

    try {
      const response = await apiClient.post(inputURL, bodyData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      if (response.status === 200) {
        Alert.alert("", "댓글을 등록하였습니다.");
        fetchData();
        setComment("");
        setParentId();
      } else {
        Alert.alert("", "댓글을 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("에러:", error);
      Alert.alert("error", "서버에 장애가 발생하였습니다.");
    }
  };

  // 댓글 수정
  const patchData = async () => {
    const inputURL = `/comment/${commentId}`;
    bodyData = {
      content: comment,
      parent_id: parentId ? parentId : null,
      is_privated: secret,
    };

    try {
      const response = await apiClient.patch(inputURL, bodyData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      console.log(response.data);
      Alert.alert("", "댓글을 수정하였습니다.");
      fetchData();
      setComment("");
      setParentId();
      setIsEdit(false);
    } catch (error) {
      Alert.alert("error", "서버에 장애가 발생하였습니다.");
    }
  };

  // 댓글 삭제
  const deleteData = async () => {
    const inputURL = `/comment/${commentId}`;
    try {
      const response = await apiClient.delete(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      if (response.status === 200) {
        Alert.alert("", "댓글을 삭제하였습니다.");
        fetchData(); // 댓글 목록을 다시 불러옵니다.
      }
    } catch (error) {
      Alert.alert("error", "서버에 장애가 발생하였습니다.");
    }
  };

  const handlePostComment = () => {
    if (isEdit) {
      patchData();
    } else {
      postData();
    }
    setComment("");
  };

  const handleMenuClick = (id, writer, author, userId, content, boolean) => {
    openOptionModal();
    setUserId(userId);
    setCommentId(id);
    setParentWriter(writer);
    setContent(content);
    setIsChildComment(boolean);
    if (author === true) {
      setActionSheetVisible(true);
      setActionSheetViewerVisible(false);
    } else {
      setActionSheetViewerVisible(true);
      setActionSheetVisible(false);
    }
  };

  const handleRemoveClick = () => {
    deleteData();
    setActionSheetVisible(false);
  };

  const handleCommentClick = () => {
    setActionSheetVisible(false);
    setActionSheetViewerVisible(false);
    setComment(`@${parentWriter} `);
    setParentId(commentId);
  };

  const openProfile = () => {
    setIsOpenProfile(!isOpenProfile);
  };
  const openOptionModal = () => {
    setIsOpenOptionModal(!isOpenOptionModal);
  };

  const handleProfileClick = () => {
    setActionSheetVisible(false);
    setActionSheetViewerVisible(false);
    openProfile();
  };

  const handleModifyClick = () => {
    // 전체 댓글에서 찾기
    let foundComment = commentData.find((comment) => comment.id === commentId);

    // 대댓글을 포함하여 찾기
    if (!foundComment) {
      commentData.some((comment) => {
        foundComment = comment.children.find((child) => child.id === commentId);
        return foundComment !== undefined;
      });
    }

    if (foundComment) {
      setComment(foundComment.content);
      setParentId(foundComment.parentId || "");
      setIsEdit(true);
      setCommentId(commentId);
      setSecret(foundComment.privated);
    } else {
      console.error("댓글을 찾을 수 없습니다.");
    }

    setActionSheetVisible(false);
  };

  const handleReportClick = () => {
    setActionSheetVisible(false);
    setActionSheetViewerVisible(false);
    commentModal();
    navigation.navigate("MainScreen", {
      screen: "Report",
      params: {
        itemId: communityId,
        reportType: "COMMENT",
        writer: parentWriter,
        content: content,
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, [commentId, communityId]);

  const handleSlideDown = () => {
    commentModal();
  };

  const handleProfile = (id) => {
    setUserId(id);
    openProfile();
  };

  return (
    <Modal
      isVisible={isCommentModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      // onSwipeComplete={commentModal}
      // swipeDirection={slide ? "down" : []}
      // swipeDirection="down"
      onBackdropPress={commentModal}
      style={[styles.modal, { maxHeight: windowHeight }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        <TouchableOpacity onPress={handleSlideDown} activeOpacity={1}>
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
        </TouchableOpacity>
        <View style={styles.modalContent} {...panResponder.panHandlers}>
          <ScrollView style={{ maxHeight: windowHeight - 200 }}>
            <Line color={"#E8E9E8"} h={2} />
            {commentData?.map((item, index) => (
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
                      marginTop: 9,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => handleProfile(item.userId)}
                      style={{ flexDirection: "row", gap: 8 }}
                    >
                      <Image
                        source={
                          item.profileImg
                            ? { uri: item.profileImg }
                            : require("../../assets/myPage_profile.png")
                        }
                        style={{ width: 32, height: 32, borderRadius: 50 }}
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          color: "#1F1F1F",
                          fontFamily: "SUITE_Medium",
                          alignSelf: "center",
                        }}
                      >
                        {item.writer}
                      </Text>
                    </TouchableOpacity>
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
                            fontFamily: "SUITE",
                            fontSize: 10,
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
                    {item.privated === true ? (
                      <Image
                        source={require("../../assets/lock.png")}
                        style={{ alignSelf: "center", width: 16, height: 16 }}
                      />
                    ) : null}
                  </View>
                  {item.deleted === false || item.deleted === false ? (
                    <View>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() =>
                          handleMenuClick(
                            item.id,
                            item.writer,
                            item.commentAuthor,
                            item.userId,
                            item.content,
                            true
                          )
                        }
                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                      >
                        <Image
                          source={require("../../assets/commentDotMenu.png")}
                          style={{ width: 20, height: 4, top: 10 }}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
                <Text
                  style={[
                    styles.comment,
                    { paddingLeft: 40 },
                    (item.revokeUser || item.deleted) && {
                      color: "#C1C1C1",
                    },
                  ]}
                >
                  {item.content}
                </Text>
                {item.deleted === true ? (
                  <View
                    style={{
                      marginBottom: 15,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 8,
                      paddingLeft: 40,
                      marginTop: 4,
                      marginBottom: 15,
                    }}
                  >
                    {item.revokeUser === false ? (
                      <Text style={styles.subComment}>{item.createdDate}</Text>
                    ) : null}
                    {item.revokeUser === false ? (
                      <Text
                        style={styles.subComment}
                        onPress={() =>
                          handleReCommentClick(item.id, item.writer)
                        }
                      >
                        답글 쓰기
                      </Text>
                    ) : null}
                  </View>
                )}
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
                              // marginTop: 9,
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => handleProfile(childItem.userId)}
                              style={{ flexDirection: "row", gap: 8 }}
                            >
                              <Image
                                // source={require("../../assets/myPage_profile.png")}
                                source={
                                  childItem.profileImg
                                    ? { uri: childItem.profileImg }
                                    : require("../../assets/myPage_profile.png")
                                }
                                style={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: 50,
                                }}
                              />
                              <Text
                                style={[
                                  styles.comment,
                                  { alignSelf: "center" },
                                ]}
                              >
                                {childItem.writer}
                              </Text>
                            </TouchableOpacity>
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
                                    paddingRight: 5,
                                    paddingLeft: 5,
                                    paddingTop: 4,
                                    paddingBottom: 4,
                                    fontFamily: "SUITE_Medium",
                                  }}
                                >
                                  작성자
                                </Text>
                              </View>
                            ) : null}
                            {childItem.privated === true ? (
                              <Image
                                source={require("../../assets/lock.png")}
                                style={{
                                  alignSelf: "center",
                                  width: 16,
                                  height: 16,
                                }}
                              />
                            ) : null}
                          </View>
                          {childItem.deleted === false ||
                          childItem.revokeUser === false ? (
                            <View>
                              <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() =>
                                  handleMenuClick(
                                    childItem.id,
                                    childItem.writer,
                                    childItem.commentAuthor,
                                    childItem.userId,
                                    childItem.content,
                                    false
                                  )
                                }
                                hitSlop={{
                                  top: 20,
                                  bottom: 20,
                                  left: 20,
                                  right: 20,
                                }}
                              >
                                <Image
                                  source={require("../../assets/commentDotMenu.png")}
                                  style={{ width: 20, height: 4, top: 10 }}
                                />
                              </TouchableOpacity>
                            </View>
                          ) : null}
                        </View>
                        <Text
                          style={[
                            styles.comment,
                            { paddingLeft: 80 },
                            (childItem.revokeUser || childItem.deleted) && {
                              color: "#C1C1C1",
                            },
                          ]}
                        >
                          {childItem.content}
                        </Text>

                        {childItem.deleted === false ? (
                          <View
                            style={{
                              flexDirection: "row",
                              gap: 8,
                              paddingLeft: 80,
                              marginTop: 4,
                              marginBottom: 15,
                            }}
                          >
                            <Text style={styles.subComment}>
                              {childItem.createdDate}
                            </Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              marginBottom: 15,
                            }}
                          />
                        )}
                        <Line color={"#E8E9E8"} h={1} />
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
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
              <Text style={styles.buttonText}>{isEdit ? "수정" : "등록"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <CommentActionSheet
        isVisible={isActionSheetVisible}
        onClose={() => setActionSheetVisible(false)}
        onRemove={handleRemoveClick}
        onComment={handleCommentClick}
        onModify={handleModifyClick}
        onProfile={handleProfileClick}
        isChildComment={isChildComment}
      />
      <CommentViewerActionSheet
        isVisible={isActionSheetViewerVisible}
        onClose={() => setActionSheetViewerVisible(false)}
        onReport={handleReportClick}
        onComment={handleCommentClick}
        onProfile={handleProfileClick}
        isChildComment={isChildComment}
      />
      <FriendProfile
        isOpenProfile={isOpenProfile}
        openProfile={openProfile}
        userId={userId}
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
    marginBottom: 18,
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
    fontFamily: "SUITE_Bold",
    color: "#1F1F1F",
  },
  comment: {
    fontSize: 15,
    color: "#1F1F1F",
    fontFamily: "SUITE_Medium",
  },
  subComment: {
    fontSize: 10,
    color: "#C1C1C1",
    fontFamily: "SUITE",
  },
  secretCommentSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 3,
  },
  secretComment: {
    color: "#5C5C5C",
    fontSize: 10,
    fontFamily: "SUITE_Bold",
  },
});

export default Comment;
