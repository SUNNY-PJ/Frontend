import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
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
  }, [userId, itemId]);

  // 게시글 삭제
  const deleteData = async () => {
    try {
      const response = await apiClient.delete(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      if (response.status === 200) {
        Alert.alert("", "게시글이 삭제되었습니다.");
      } else {
        Alert.alert("", "게시글 삭제에 실패하였습니다.");
      }
    } catch (error) {
      console.error("에러:", error);
      Alert.alert("error", "서버에 장애가 발생하였습니다.");
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

  const handleMenuClick = (authorVal) => {
    if (authorVal) {
      setAuthorModalVisible(true);
    } else {
      setNoAuthorModalVisible(true);
    }
  };

  const handleProfileClick = () => {
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

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View style={styles.contentContainer} key={index}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 17,
              marginBottom: 26,
              paddingRight: 20,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Community", {
                  screen: "Community",
                })
              }
            >
              <Image
                source={require("../../assets/prevBtn.png")}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                color: "#1F1F1F",
                fontFamily: "SUITE_Bold",
                left: 12,
              }}
            >
              {item.type}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 12,
              }}
            >
              <TouchableOpacity onPress={handleScrapClick}>
                <Image
                  source={
                    // item.isScraped
                    isScrap
                      ? require("../../assets/scrapActive.png")
                      : require("../../assets/scrapInactive.png")
                  }
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleMenuClick(item.isAuthor)}
                style={{
                  alignSelf: "center",
                }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Image
                  source={require("../../assets/menu.png")}
                  style={{
                    width: 20,
                    height: 4,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
      {data.map((item) => (
        <View style={styles.contentContainer} key={item.id}>
          <Text
            style={{
              fontSize: 20,
              color: "#1F1F1F",
              fontFamily: "SUITE_Medium",
              marginBottom: 9,
              padding: 4,
              marginBottom: 28,
            }}
          >
            {item.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              marginBottom: 28,
            }}
          >
            <TouchableOpacity activeOpacity={0.8} onPress={handleProfileClick}>
              <Image
                source={{ uri: item.profileImg }}
                style={{ width: 40, height: 40, borderRadius: 50 }}
              />
            </TouchableOpacity>
            <View style={{ gap: 4 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 7 }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleProfileClick}
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
                    style={{
                      width: 300,
                      height: 300,
                      resizeMode: "contain",
                      marginTop: 14,
                    }}
                  />
                ))}
              </View>
            </View>
            <Line color={"#E8E9E8"} h={2} />
            <View style={styles.contentContainer}>
              <TouchableOpacity activeOpacity={0.6} onPress={commentModal}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    marginTop: 20,
                    paddingBottom: 20,
                  }}
                >
                  <Image
                    source={require("../../assets/chatIcon.png")}
                    style={{
                      width: 24,
                      height: 24,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#1F1F1F",
                      fontFamily: "SUITE",
                    }}
                  >
                    {item.commentCnt}
                  </Text>
                  <Image
                    source={require("../../assets/arrowLeft.png")}
                    style={{
                      width: 18,
                      height: 18,
                      right: 4,
                    }}
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
        onProfile={handleProfileClick}
        onReport={handleReport}
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
        userId={userId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  contentContainer: {
    paddingLeft: 20,
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: "center",
    marginTop: 12,
  },
  name: {
    fontSize: 20,
    color: "#1F1F1F",
    fontFamily: "SUITE",
  },
  setting: {
    fontSize: 16,
    color: "#5C5C5C",
    fontFamily: "SUITE_Medium",
  },
  subDescription: {
    fontSize: 10,
    color: "#1F1F1F",
    fontFamily: "SUITE",
  },
  contents: {
    fontSize: 15,
    color: "#1F1F1F",
    fontFamily: "SUITE",
  },
});

export default Detail;
