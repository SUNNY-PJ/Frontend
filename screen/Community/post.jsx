import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { proxyUrl } from "../../constant/common";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Input from "../../components/Input/input";
import InputMax from "../../components/Input/inputMax";
import SmallBtn from "../../components/Btn/smallBtn";
import Line from "../../components/Line";

const Post = () => {
  const navigation = useNavigation();
  const inputURL = "/community";
  const cleanedURL = inputURL.replace(/[\u200B]/g, "");

  const url = proxyUrl + cleanedURL;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleContentChange = (text) => {
    setContent(text);
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
    setImages([...images, result.assets[0].uri]); // 이미지 배열에 추가
  };

  // 첨부한 이미지 삭제
  const removeImage = (index) => {
    // 이미지 배열에서 선택한 이미지를 제거
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  // post api
  const formData = new FormData();
  images.forEach((image, index) => {
    const fileName = image.split("/").pop();
    const match = /\.(\w+)$/.exec(fileName ?? "");
    const type = match ? `image/${match[1]}` : `image`;
    formData.append(`image${index}`, { uri: image, name: fileName, type });
  });

  console.log(formData);

  const postData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    console.log("test~~~");
    try {
      const bodyData = {
        title: title,
        contents: content,
        type: "test입니다.",
      };

      const response = await axios.post(url, bodyData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
        data: formData,
      });
      console.log("url:::::::", url);
      console.log(response);
      console.log("데이터:", response.data);

      navigation.navigate("Community", { screen: "Community" });
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류:", error.response.data);
        console.error("서버 응답 메세지:", error.message);
      } else {
        console.error("에러:", error);
      }
    }
  };

  const handlePost = () => {
    console.log("등록 버튼 클릭");
    postData();
  };

  return (
    <>
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
              />
            </TouchableOpacity>
            <SmallBtn title={"등록"} onClick={handlePost} />
          </View>
          {/* 카테고리 선택 */}
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
                fontWeight: 700,
                borderColor: "#1F1F1F",
              }}
            >
              카테고리 선택
            </Text>
            <Image
              source={require("../../assets/categoryArrow.png")}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </View>
          <Line color={"#C1C1C1"} h={1} />
          {/* 카테고리 선택 */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "#1F1F1F",
              marginBottom: 8,
              marginTop: 16,
              paddingLeft: 12,
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
              fontSize: 16,
              fontWeight: 500,
              color: "#1F1F1F",
              marginBottom: 8,
              marginTop: 10,
              paddingLeft: 12,
            }}
          >
            내용
          </Text>
          <InputMax
            placeholder={"내용을 입력하세요"}
            inputValue={content}
            handleInputChange={handleContentChange}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "#1F1F1F",
              marginBottom: 8,
              marginTop: 10,
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
                    width: 70,
                    height: 70,
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
                  style={{ width: 70, height: 70 }}
                />
              </Pressable>
            )}
          </View>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 500,
              color: "#5C5C5C",
              marginTop: 8,
            }}
          >
            미디어는 최대 4장까지 첨부가 가능합니다.
          </Text>
        </View>
      </View>
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
    fontWeight: 500,
    color: "#1F1F1F",
  },
});

export default Post;
