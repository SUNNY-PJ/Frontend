import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
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
import { styles } from "./comment.styles";
import { useNavigation } from "@react-navigation/native";
import Line from "../../components/Line";
import Modal from "react-native-modal";
import CommentActionSheet from "../../components/BottomSheet/commentActionSheet";
import CommentViewerActionSheet from "../../components/BottomSheet/commentViewerActionSheet";
import apiClient from "../../api/apiClient";
import FriendProfile from "../Friends/friendProfile";
import MsgModal from "../../components/Modal/msg/msgModal";

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
  const [isModalVisible, setIsModalVisible] = useState(false);
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
  };

  const handleSecretClick = () => {
    setSecret(!secret);
  };

  const handleReCommentClick = (parentId, parentIdWriter) => {
    setComment(`@${parentIdWriter} `);
    setParentId(parentId);
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
        fetchData();
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

  const handleBlockUser = () => {
    // console.log("차단", userId, parentWriter);
    // commentModal();
    setActionSheetVisible(false);
    setActionSheetViewerVisible(false);
    setIsModalVisible(true);
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

  const blockUser = async () => {
    const bodyData = {
      userId: userId,
    };
    try {
      const response = await apiClient.post("/users/block", bodyData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      console.log(response.data);
      Alert.alert(
        "",
        `${parentWriter}님을 차단했습니다.\n마이페이지 차단 관리에서 차단 해제할 수 있습니다.`
      );
      navigation.navigate("MainScreen", { screen: "Community" });
    } catch (error) {
      Alert.alert("error", error.response.data);
    }
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  const handleBlockFriend = () => {
    blockUser();
  };

  return (
    <Modal
      isVisible={isCommentModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={commentModal}
      style={[styles.modal, { maxHeight: windowHeight }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        <TouchableOpacity onPress={handleSlideDown} activeOpacity={1}>
          <View style={styles.slideSection} />
        </TouchableOpacity>
        <View style={styles.modalContent} {...panResponder.panHandlers}>
          <ScrollView style={{ maxHeight: windowHeight - 200 }}>
            <Line color={"#E8E9E8"} h={2} />
            {commentData?.map((item, index) => (
              <View style={styles.commentSection} key={item.id}>
                <View style={styles.setting2}>
                  <View style={[styles.setting, { marginTop: 9 }]}>
                    <TouchableOpacity
                      onPress={() => handleProfile(item.userId)}
                      style={styles.setting}
                    >
                      <Image
                        source={
                          item.profileImg
                            ? { uri: item.profileImg }
                            : require("../../assets/myPage_profile.png")
                        }
                        style={styles.profileImg}
                      />
                      <Text style={styles.writer}>{item.writer}</Text>
                    </TouchableOpacity>
                    {item.author === true ? (
                      <View style={styles.authorBox}>
                        <Text style={styles.author}>작성자</Text>
                      </View>
                    ) : null}
                    {item.privated === true ? (
                      <Image
                        source={require("../../assets/lock.png")}
                        style={styles.privateImg}
                      />
                    ) : null}
                  </View>
                  {!item.deleted && !item.blockedUser && !item.revokeUser && (
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
                          style={styles.dotMenuImg}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <Text
                  style={[
                    styles.comment,
                    { paddingLeft: 40 },
                    (item.revokeUser || item.deleted || item.blockedUser) && {
                      color: "#C1C1C1",
                    },
                  ]}
                >
                  {item.content}
                </Text>
                {item.deleted ? (
                  <View style={{ marginBottom: 15 }} />
                ) : (
                  <View style={styles.container}>
                    {!item.blockedUser && (
                      <Text style={styles.subComment}>{item.createdDate}</Text>
                    )}
                    {item.revokeUser ||
                    item.blockedUser ||
                    item.deleted ? null : (
                      <Text
                        style={styles.subComment}
                        onPress={() =>
                          handleReCommentClick(item.id, item.writer)
                        }
                      >
                        답글 쓰기
                      </Text>
                    )}
                  </View>
                )}
                <Line color={"#E8E9E8"} h={1} />
                {/* 대댓글 ui */}
                {item.children.length > 0 && (
                  <View>
                    {item.children.map((childItem) => (
                      <View key={childItem.id}>
                        <View style={styles.setting3}>
                          <View style={styles.setting}>
                            <TouchableOpacity
                              onPress={() => handleProfile(childItem.userId)}
                              style={styles.setting}
                            >
                              <Image
                                source={
                                  childItem.profileImg
                                    ? { uri: childItem.profileImg }
                                    : require("../../assets/myPage_profile.png")
                                }
                                style={styles.profileImg}
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
                              <View style={styles.authorBox}>
                                <Text style={StyleSheetList.author}>
                                  작성자
                                </Text>
                              </View>
                            ) : null}
                            {childItem.privated === true ? (
                              <Image
                                source={require("../../assets/lock.png")}
                                style={styles.privateImg}
                              />
                            ) : null}
                          </View>
                          {!childItem.deleted &&
                            !childItem.blockedUser &&
                            !childItem.revokeUser && (
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
                                    style={styles.dotMenuImg}
                                  />
                                </TouchableOpacity>
                              </View>
                            )}
                        </View>
                        <Text
                          style={[
                            styles.comment,
                            { paddingLeft: 80 },
                            (childItem.revokeUser ||
                              childItem.deleted ||
                              childItem.blockedUser) && {
                              color: "#C1C1C1",
                            },
                          ]}
                        >
                          {childItem.content}
                        </Text>
                        {!childItem.deleted ? (
                          <View style={styles.childrenSection}>
                            <Text style={styles.subComment}>
                              {childItem.createdDate}
                            </Text>
                          </View>
                        ) : (
                          <View style={{ marginBottom: 15 }} />
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
            <Image source={imageSource} style={styles.secretImg} />
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
        onBlock={handleBlockUser}
        isChildComment={isChildComment}
      />
      <FriendProfile
        isOpenProfile={isOpenProfile}
        openProfile={openProfile}
        userId={userId}
      />
      <MsgModal
        isVisible={isModalVisible}
        toggleModal={handleCancelDelete}
        onDelete={handleBlockFriend}
        onCancel={handleCancelDelete}
        msgTitle="차단하시겠어요?"
        msgContent="해당 사용자가 커뮤니티에서 작성한 글과 댓글, 답글을 볼 수 없습니다."
      />
    </Modal>
  );
};

export default Comment;
