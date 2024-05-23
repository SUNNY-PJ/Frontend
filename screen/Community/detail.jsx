import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { styles } from "./detail.styles";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Line from "../../components/Line";
import Comment from "./comment";
import CommunityAuthorSheet from "../../components/BottomSheet/communityAuthorSheet";
import CommunitySheet from "../../components/BottomSheet/communitySheet";
import DeleteMsg from "../../components/Modal/community/deleteMsg";
import FriendProfile from "../Friends/friendProfile";
import ModifyMsg from "../../components/Modal/community/modifyMsg";
import apiClient from "../../api/apiClient";
import MsgModal from "../../components/Modal/msg/msgModal";

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params.params;
  const { itemId } = route.params.params;
  const inputURL = `/community/${itemId}`;
  // 화면의 전체 높이
  const windowHeight = Dimensions.get("window").height;
  const [data, setData] = useState([]);
  const [writer, setWriter] = useState("");
  const [content, setContent] = useState("");
  const [noAuthorModalVisible, setNoAuthorModalVisible] = useState(false);
  const [authorModalVisible, setAuthorModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [isCommentModal, setIsCommentModal] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isScrap, setIsScrap] = useState(false);
  const [writerId, setWriterId] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const commentModal = () => {
    setIsCommentModal(!isCommentModal);
  };
  const openProfile = () => {
    setIsOpenProfile(!isOpenProfile);
  };

  const handleScrapClick = () => {
    setIsScrap(!isScrap);
    if (isScrap) {
      deleteScrapData();
    } else {
      postScrapData();
    }
  };

  const fetchData = async () => {
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      const DetailData = response.data;
      console.log("데이터:::", DetailData);
      setData([DetailData]);
      setIsScrap(DetailData.isScraped);
      setWriter(DetailData.writer);
      setContent(DetailData.contents);
    } catch (error) {
      console.error("에러:", error);
      Alert.alert("error", "서버에 장애가 발생하였습니다.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, itemId, writerId]);

  // 게시글 삭제
  const deleteData = async () => {
    try {
      const response = await apiClient.delete(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      Alert.alert("", "게시글이 삭제되었습니다.");
    } catch (error) {
      console.error("에러:", error);
      Alert.alert("", "게시글 삭제에 실패하였습니다.");
    }
  };

  // 스크랩 삭제
  const deleteScrapData = async () => {
    const inputURL = `/scrap/${itemId}`;
    try {
      const response = await apiClient.delete(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
    } catch (error) {
      console.error("에러:", error);
    }
  };

  // 스크랩 등록
  const postScrapData = async () => {
    const inputURL = `/scrap/${itemId}`;
    try {
      const response = await apiClient.post(
        inputURL,
        {},
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const putData = async () => {
    navigation.navigate("Modify", {
      screen: "Modify",
      params: {
        itemId: itemId,
      },
    });
  };

  const handleMenuClick = (authorVal, userId) => {
    setWriterId(userId);
    if (authorVal) {
      setAuthorModalVisible(true);
    } else {
      setNoAuthorModalVisible(true);
    }
  };

  const handleProfileClick = (id) => {
    setWriterId(id);
    openProfile();
    setNoAuthorModalVisible(false);
  };

  const handleDeleteConfirm = () => {
    deleteData();
    setDeleteModalVisible(false);
    navigation.navigate("MainScreen", { screen: "Community" });
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  const handleModifyConfirm = () => {
    putData();
    setModifyModalVisible(false);
  };

  const handleModifyCancel = () => {
    setModifyModalVisible(false);
  };

  const handleDeletePost = () => {
    setDeleteModalVisible(true);
    setAuthorModalVisible(false);
  };

  const handlePutPost = () => {
    setModifyModalVisible(true);
    setAuthorModalVisible(false);
  };

  const handleReport = () => {
    setNoAuthorModalVisible(false);
    navigation.navigate("MainScreen", {
      screen: "Report",
      params: {
        itemId: itemId,
        reportType: "COMMUNITY",
        writer: writer,
        content: content,
      },
    });
  };

  const blockUser = async () => {
    const bodyData = {
      userId: writerId,
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
        `${writer}님을 차단했습니다.\n마이페이지 차단 관리에서 차단 해제할 수 있습니다.`
      );
      navigation.navigate("MainScreen", { screen: "Community" });
    } catch (error) {
      Alert.alert("error", error.response.data);
    }
  };

  const handleBlockUser = () => {
    // console.log("차단", writer, writerId);
    setNoAuthorModalVisible(false);
    setIsModalVisible(true);
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  const handleBlockFriend = () => {
    blockUser();
    console.log(writer, writerId);
  };

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View style={styles.contentContainer} key={index}>
          <View style={styles.section}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Community", {
                  screen: "Community",
                })
              }
            >
              <Image
                source={require("../../assets/prevBtn.png")}
                style={styles.prevImg}
              />
            </TouchableOpacity>
            <Text style={styles.typeText}>{item.type}</Text>
            <View style={styles.scrapSection}>
              <TouchableOpacity onPress={handleScrapClick}>
                <Image
                  source={
                    // item.isScraped
                    isScrap
                      ? require("../../assets/scrapActive.png")
                      : require("../../assets/scrapInactive.png")
                  }
                  style={styles.prevImg}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleMenuClick(item.isAuthor, item.userId)}
                style={{
                  alignSelf: "center",
                }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Image
                  source={require("../../assets/menu.png")}
                  style={styles.menuImg}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
      {data.map((item) => (
        <View style={styles.contentContainer} key={item.id}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.box}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                handleProfileClick(item.userId);
              }}
            >
              <Image
                source={{ uri: item.profileImg }}
                style={styles.profileImg}
              />
            </TouchableOpacity>
            <View style={{ gap: 4 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 7 }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    handleProfileClick(item.userId);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "SUITE_Bold",
                      color: "#1F1F1F",
                    }}
                  >
                    {item.writer}
                  </Text>
                </TouchableOpacity>
                {/* <SmallBtn title={"대화하기"} border={4} onClick={handleChat} /> */}
              </View>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Text style={styles.subDescription}>조회 {item.viewCount}</Text>
                <Text style={styles.subDescription}>{item.createdAt}</Text>
                <Text style={styles.subDescription}>
                  댓글 {item.commentCnt}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ))}
      <Line color={"#E8E9E8"} h={2} />
      {data.map((item) => (
        <View key={item.id}>
          <ScrollView style={{ height: windowHeight - 259 - 135 }}>
            <View style={[styles.contentContainer, { paddingRight: 20 }]}>
              <View style={{ marginTop: 24, marginBottom: 70 }}>
                <Text style={styles.contents}>{item.contents}</Text>
                {item.photoList.map((photo, index) => (
                  <Image
                    key={index}
                    source={{ uri: photo }}
                    style={styles.photoImg}
                  />
                ))}
              </View>
            </View>
            <Line color={"#E8E9E8"} h={2} />
            <View style={styles.contentContainer}>
              <TouchableOpacity activeOpacity={0.6} onPress={commentModal}>
                <View style={styles.bottomSection}>
                  <Image
                    source={require("../../assets/chatIcon.png")}
                    style={styles.prevImg}
                  />
                  <Text style={styles.commentCnt}>{item.commentCnt}</Text>
                  <Image
                    source={require("../../assets/arrowLeft.png")}
                    style={styles.arrowImg}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      ))}
      <Comment
        isCommentModal={isCommentModal}
        commentModal={commentModal}
        communityId={itemId}
      />
      <CommunityAuthorSheet
        isVisible={authorModalVisible}
        onClose={() => setAuthorModalVisible(false)}
        onRemove={handleDeletePost}
        onModify={handlePutPost}
      />
      <CommunitySheet
        isVisible={noAuthorModalVisible}
        onClose={() => setNoAuthorModalVisible(false)}
        onProfile={() => handleProfileClick(writerId)}
        onReport={handleReport}
        onBlock={handleBlockUser}
      />
      <DeleteMsg
        isVisible={deleteModalVisible}
        toggleModal={() => setDeleteModalVisible(!deleteModalVisible)}
        onDelete={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
      <ModifyMsg
        isVisible={modifyModalVisible}
        toggleModal={() => setModifyModalVisible(!modifyModalVisible)}
        onDelete={handleModifyConfirm}
        onCancel={handleModifyCancel}
      />
      <FriendProfile
        isOpenProfile={isOpenProfile}
        openProfile={openProfile}
        userId={writerId}
      />
      <MsgModal
        isVisible={isModalVisible}
        toggleModal={handleCancelDelete}
        onDelete={handleBlockFriend}
        onCancel={handleCancelDelete}
        msgTitle="차단하시겠어요?"
        msgContent="해당 사용자가 커뮤니티에서 작성한 글과 댓글, 답글을 볼 수 없습니다."
      />
    </View>
  );
};

export default Detail;
