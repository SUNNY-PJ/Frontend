import React, { useState, useEffect } from "react";
import { proxyUrl } from "../../constant/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Input from "../../components/Input/input";
import InputMax from "../../components/Input/inputMax";
import SmallBtn from "../../components/Btn/smallBtn";
import Line from "../../components/Line";

const Modify = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { itemId } = route.params.params;
  const inputURL = `/community/${itemId}`;
  const url = proxyUrl + inputURL;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [data, setData] = useState([]);

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleContentChange = (text) => {
    setContent(text);
  };

  const [request, setRequest] = ImagePicker.useMediaLibraryPermissions();
  const [images, setImages] = useState([]);

  const uploadImage = async () => {
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
  };

  // 첨부한 이미지 삭제
  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const postData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });

      const originalData = response.data.data;

      const modifiedTitle = title !== "" ? title : originalData.title;
      const modifiedContents = content !== "" ? content : originalData.contents;

      const communityRequest = {
        title: modifiedTitle,
        contents: modifiedContents,
        type: "절약 꿀팁",
      };

      // 유효성 검사
      if (modifiedTitle.trim() === "") {
        alert("제목을 입력해주세요.");
        return;
      } else if (modifiedContents.trim() === "") {
        alert("내용을 입력해주세요.");
        return;
      } else if (modifiedTitle.length > 35) {
        alert("제목은 35자 이하로 입력해주세요.");
        return;
      }

      const formData = new FormData();
      formData.append("communityRequest", JSON.stringify(communityRequest));

      images.forEach((image, index) => {
        if (image) {
          const fileName = image.split("/").pop();
          const match = /\.(\w+)$/.exec(fileName ?? "");
          const type = match ? `image/${match[1]}` : `image`;
          formData.append("files", {
            uri: image,
            name: fileName,
            type: type,
          });
        }
      });

      const postResponse = await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log("데이터:123123", postResponse.data);
      if (response.status === 200) {
        alert("게시글을 수정하였습니다.");
        fetchData();
        navigation.navigate("Community", { screen: "Community" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePost = () => {
    console.log("수정 버튼 클릭");
    postData();
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
      });

      console.log("데이터:", response.data);
      const DetailData = response.data.data;
      setData([DetailData]);
      console.log("5555", DetailData.title);
      // photoList가 존재하는지 확인하고 images 업데이트
      if (DetailData.photoList && DetailData.photoList.length > 0) {
        const initialImages = DetailData.photoList;
        setImages(initialImages);
        console.log("사진이 있습니다.", initialImages);
      } else {
        console.log("사진이 없습니다.");
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <View style={styles.container}>
        {data.map((item) => (
          <View style={styles.contentContainer} key={item.MediaTypeOptions}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#1F1F1F",
                alignSelf: "center",
                marginTop: 17,
              }}
            >
              게시글 수정
            </Text>
            <View
              style={{
                marginTop: 8,
                marginBottom: 20,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <SmallBtn
                title={"취소"}
                color={"#E8E9E8"}
                onClick={() =>
                  navigation.navigate("Community", {
                    screen: "Community",
                  })
                }
              />
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
                  fontFamily: "SUITE_Bold",
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
              placeholder="제목을 입력하세요"
              inputValue={title || item.title}
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
                fontFamily: "SUITE_Medium",
              }}
            >
              내용
            </Text>
            <InputMax
              placeholder="내용을 입력하세요"
              placeholderTextColor="#000"
              inputValue={content || item.contents}
              handleInputChange={handleContentChange}
            />

            <Text
              style={{
                fontSize: 16,
                fontWeight: 500,
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
                fontFamily: "SUITE_Medium",
              }}
            >
              미디어는 최대 4장까지 첨부가 가능합니다.
            </Text>
          </View>
        ))}
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
    fontFamily: "SUITE_Medium",
  },
});

export default Modify;
