import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Input from "../../components/Input/input";
import InputMax from "../../components/Input/inputMax";

const Post = () => {
  const [request, setRequest] = ImagePicker.useMediaLibraryPermissions();
  const [images, setImages] = useState([]); // 이미지 배열로 상태 관리

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

  return (
    <>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "#1F1F1F",
              marginBottom: 8,
              marginTop: 10,
            }}
          >
            제목
          </Text>
          <Input placeholder={"제목을 입력하세요"} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "#1F1F1F",
              marginBottom: 8,
              marginTop: 10,
            }}
          >
            내용
          </Text>
          <InputMax placeholder={"내용을 입력하세요"} />
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
    paddingLeft: 16,
    paddingRight: 24,
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
