import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCommunity } from "../../context/communityContext";
import * as ImagePicker from "expo-image-picker";
import Input from "../../components/Input/input";
import InputMax from "../../components/Input/inputMax";
import SmallBtn from "../../components/Btn/smallBtn";
import Line from "../../components/Line";
import BottomSheetScreen from "../../components/BottomSheet/BottomSheetScreen";
import apiClient from "../../api/apiClient";
const { width } = Dimensions.get("window");
const isLargeScreen = width > 375;

const Post = () => {
  const { fetchData } = useCommunity();
  const navigation = useNavigation();
  const inputURL = "/community";
  const COMMUNITY_CATEGORY = [
    { title: "절약 꿀팁", data: "절약 꿀팁" },
    { title: "자유 게시판", data: "자유 게시판" },
  ];

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [open, setOpen] = useState(false);

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleContentChange = (text) => {
    setContent(text);
  };

  const handleCategoryClick = () => {
    setOpen(!open);
    console.log(open);
    console.log("카테고리 클릭");
  };

  const handleCategorySelect = (data) => {
    setSelectedCategory(data);
    if (data === "절약 꿀팁") {
      setCategory("절약 꿀팁");
    } else if (data === "자유 게시판") {
      setCategory("자유 게시판");
    }
  };

  const [request, setRequest] = ImagePicker.useMediaLibraryPermissions();
  const [images, setImages] = useState([]);

  const uploadImage = async () => {
    // 권한 확인
    // 권한 없으면 물어보고 승인하지 않으면 return
    console.log("click");
    if (!request?.granted) {
      const permission = await setRequest();
      if (!permission.granted) {
        return null;
      }
    }
    // 이미지 업로드 기능
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
    });
    // 이미지 업로드 취소한 경우
    if (result.cancelled) {
      return null;
    }
    // 이미지 업로드 결과 및 이미지 경로 업데이트
    console.log(result);
    setImages([...images, result.assets[0].uri]);
    // setImages([...images, result.assets.map((asset) => asset.uri)]);
  };

  // 첨부한 이미지 삭제
  const removeImage = (index) => {
    // 이미지 배열에서 선택한 이미지를 제거
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const communityRequest = {
    title: title,
    contents: content,
    type: category,
  };

  // post api
  const formData = new FormData();
  formData.append("communityRequest", JSON.stringify(communityRequest));

  images.forEach((image, index) => {
    const fileName = image.split("/").pop();
    const match = /\.(\w+)$/.exec(fileName ?? "");
    const type = match ? `image/${match[1]}` : `image`;
    formData.append("files", {
      uri: image,
      name: fileName,
      type: type,
    });
  });

  const postData = async () => {
    // 유효성 검사
    if (title.trim() === "") {
      Alert.alert("", "제목을 입력해주세요.");
      return;
    } else if (content.trim() === "") {
      Alert.alert("", "내용을 입력해주세요.");
      return;
    } else if (title.length > 35) {
      Alert.alert("", "제목은 35자 이하로 입력해주세요.");
      return;
    }

    try {
      const response = await apiClient.post(inputURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("데이터:", response.data);
      Alert.alert("", "게시글을 등록하였습니다.");
      fetchData();
      navigation.navigate("Community", { screen: "Community" });
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류:", error.response.status);
        if (error.response.status === 400) {
          Alert.alert("", "카테고리를 선택해주세요.");
        }
      } else {
        console.error("에러:", error);
        Alert.alert("error", "서버에 장애가 발생하였습니다.");
      }
    }
  };

  const handlePost = () => {
    postData();
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View
              style={{
                marginTop: 12,
                marginBottom: 20,
                flexDirection: "row",
                justifyContent: "space-between",
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
                  source={require("../../assets/close.png")}
                  style={{
                    width: 16,
                    height: 16,
                  }}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                />
              </TouchableOpacity>
              <SmallBtn title={"등록"} onClick={handlePost} />
            </View>
            {/* 카테고리 선택 */}
            <TouchableOpacity onPress={handleCategoryClick}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    borderColor: "#1F1F1F",
                    fontFamily: "SUITE_Bold",
                  }}
                >
                  {selectedCategory ? selectedCategory : "카테고리 선택"}
                </Text>
                <Image
                  source={require("../../assets/categoryArrow.png")}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </View>
            </TouchableOpacity>
            <Line color={"#C1C1C1"} h={1} />
            {/* 카테고리 선택 */}
            <Text
              style={{
                fontSize: isLargeScreen ? 16 : 14,
                color: "#1F1F1F",
                marginBottom: isLargeScreen ? 8 : 4,
                marginTop: isLargeScreen ? 16 : 8,
                paddingLeft: 12,
                fontFamily: "SUITE_Medium",
              }}
            >
              제목
            </Text>
            <Input
              placeholder={"제목을 입력하세요"}
              inputValue={title}
              handleInputChange={handleTitleChange}
            />
            <Text
              style={{
                fontSize: isLargeScreen ? 16 : 14,
                color: "#1F1F1F",
                marginBottom: 8,
                marginTop: 10,
                paddingLeft: 12,
                fontFamily: "SUITE_Medium",
              }}
            >
              내용
            </Text>
            <InputMax
              placeholder={
                "내용을 입력하세요. (부적절하거나 불쾌감을 줄 수 있는 컨텐츠는 제재를 받을 수 있습니다)"
              }
              inputValue={content}
              handleInputChange={handleContentChange}
            />
            <Text
              style={{
                fontSize: isLargeScreen ? 16 : 14,
                color: "#1F1F1F",
                marginBottom: 8,
                marginTop: 10,
                fontFamily: "SUITE_Medium",
              }}
            >
              미디어 첨부
            </Text>
            <View style={styles.media}>
              {images.map((image, index) => (
                <View key={index} style={{ position: "relative" }}>
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: isLargeScreen ? 70 : 60,
                      height: isLargeScreen ? 70 : 60,
                      borderColor: "#C1C1C1",
                      borderRadius: 8,
                      borderWidth: 1.5,
                    }}
                  />
                  <Pressable
                    onPress={() => removeImage(index)}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                  >
                    <Image
                      source={require("../../assets/deletePhoto.png")}
                      style={{
                        width: 18,
                        height: 18,
                        position: "absolute",
                        top: -6,
                        right: -6,
                      }}
                    />
                  </Pressable>
                </View>
              ))}
              {images.length < 4 && (
                <Pressable onPress={uploadImage}>
                  <Image
                    source={require("../../assets/photo.png")}
                    style={{
                      width: isLargeScreen ? 70 : 60,
                      height: isLargeScreen ? 70 : 60,
                    }}
                  />
                </Pressable>
              )}
            </View>
            <Text
              style={{
                fontSize: 10,
                color: "#5C5C5C",
                marginTop: 8,
                fontFamily: "SUITE_Medium",
              }}
            >
              미디어는 최대 4장까지 첨부가 가능합니다.
            </Text>
          </View>
          {open && (
            <BottomSheetScreen
              title={"카테고리"}
              data={COMMUNITY_CATEGORY}
              modalVisible={open}
              modalDisable={handleCategoryClick}
              onCategorySelect={handleCategorySelect}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </>
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
  media: {
    flexDirection: "row",
    gap: 16,
  },
  text: {
    fontSize: 16,
    color: "#1F1F1F",
    fontFamily: "SUITE",
  },
});

export default Post;
