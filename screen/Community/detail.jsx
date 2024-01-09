import axios from "axios";
import React, { useState, useEffect } from "react";
import { proxyUrl } from "../../constant/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import SmallBtn from "../../components/Btn/smallBtn";
import Line from "../../components/Line";
import Comment from "./comment";
import OptionModal from "../../components/Modal/community/optionModal";
import DeleteMsg from "../../components/Modal/community/deleteMsg";

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { itemId } = route.params.params;
  const inputURL = `/community/${itemId}`;
  const url = proxyUrl + inputURL;

  const [data, setData] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isCommentModal, setIsCommentModal] = useState(false);
  const commentModal = () => {
    setIsCommentModal(!isCommentModal);
  };
  const [isOpenOptionModal, setIsOpenOptionModal] = useState(false);
  const openOptionModal = () => {
    setIsOpenOptionModal(!isOpenOptionModal);
    console.log("메뉴 클릭", isOpenOptionModal);
  };

  const fetchData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    console.log(access_token);

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
        // params: {
        //   communityId: itemId,
        // },
      });

      console.log("데이터:", response.data);
      const DetailData = response.data.data;
      // const DetailCommentData = [DetailData].map((item) => item.commentList);
      setData([DetailData]);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");

    try {
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log("데이터:", response);
      console.log("삭제되었습니다");
      alert("게시글이 삭제되었습니다.");
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
    console.log("수정 눌렀냐");
  };

  const handleChat = () => {
    console.log("대화하기 버튼 클릭");
  };

  const handleMenuClick = () => {
    console.log("메뉴 클릭");
    openOptionModal();
  };

  const handleDeleteConfirm = () => {
    deleteData();
    setDeleteModalVisible(false);
    console.log("게시글을 삭제합니다.");
    navigation.navigate("MainScreen", { screen: "Community" });
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
    console.log("삭제를 취소했습니다.");
  };

  const handleDeletePost = () => {
    setDeleteModalVisible(true);
  };

  const handlePutPost = () => {
    Alert.alert(
      "게시물 수정",
      "수정하시겠습니까?",
      [
        {
          text: "취소",
          onPress: () => console.log("수정을 취소했습니다."),
          style: "cancel",
        },
        {
          text: "확인",
          onPress: () => {
            putData();
            console.log("게시글을 수정합니다.");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 17,
            marginBottom: 26,
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
              fontWeight: "700",
            }}
          >
            절약 꿀팁
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 12,
            }}
          >
            <Image
              source={require("../../assets/scrapActive.png")}
              style={{
                width: 24,
                height: 24,
              }}
            />
            <TouchableOpacity
              onPress={handleMenuClick}
              style={{
                alignSelf: "center",
              }}
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
      {data.map((item) => (
        <View style={styles.contentContainer} key={item.id}>
          <Text
            style={{
              fontSize: 20,
              color: "#1F1F1F",
              fontWeight: 500,
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
            <Image
              source={{ uri: item.profileImg }}
              style={{ width: 40, height: 40, borderRadius: 50 }}
            />
            <View style={{ gap: 4 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 7 }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: 700, color: "#1F1F1F" }}
                >
                  {item.writer}
                </Text>
                <SmallBtn title={"대화하기"} border={4} onClick={handleChat} />
              </View>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Text
                  style={{ fontSize: 10, fontWeight: 500, color: "#1F1F1F" }}
                >
                  조회 {item.viewCount}
                </Text>
                <Text
                  style={{ fontSize: 10, fontWeight: 500, color: "#1F1F1F" }}
                >
                  {item.createdAt}
                </Text>
                <Text
                  style={{ fontSize: 10, fontWeight: 500, color: "#1F1F1F" }}
                >
                  댓글 {item.comment_cnt}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ))}
      <Line color={"#E8E9E8"} h={2} />
      {data.map((item) => (
        <View key={item.id}>
          <View style={styles.contentContainer}>
            <View style={{ marginTop: 24, marginBottom: 70 }}>
              <Text>{item.contents}</Text>
              {item.photoList.map((photo, index) => (
                <Image
                  key={index}
                  source={{ uri: photo }}
                  style={{
                    width: 300,
                    height: 200,
                    // paddingLeft: "20",
                    // paddingRight: "20",
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
                }}
              >
                <Image
                  source={require("../../assets/chatIcon.png")}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
                <Text>{item.comment_cnt}</Text>
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
        </View>
      ))}
      <Comment
        isCommentModal={isCommentModal}
        commentModal={commentModal}
        communityId={itemId}
      />
      <OptionModal
        isOpenOptionModal={isOpenOptionModal}
        openOptionModal={openOptionModal}
        onDeletePress={handleDeletePost}
        onPutPress={handlePutPost}
      />
      <DeleteMsg
        isVisible={deleteModalVisible}
        toggleModal={() => setDeleteModalVisible(!deleteModalVisible)}
        onDelete={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
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
    paddingRight: 21,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 24,
    marginTop: 17,
    marginBottom: 18,
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: "center",
    marginTop: 12,
  },
  name: { fontSize: 20, color: "#1F1F1F", fontWeight: 500 },
  setting: {
    fontSize: 16,
    color: "#5C5C5C",
    fontWeight: 600,
  },
  title: {
    fontSize: 16,
    color: "#1F1F1F",
    fontWeight: 900,
    paddingLeft: 20,
    paddingTop: 16,
    marginBottom: 8,
  },
});

export default Detail;
