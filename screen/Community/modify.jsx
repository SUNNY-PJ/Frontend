import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Input from "../../components/Input/input";
import InputMax from "../../components/Input/inputMax";
import SmallBtn from "../../components/Btn/smallBtn";
import Line from "../../components/Line";
import apiClient from "../../api/apiClient";
import { useCommunity } from "../../context/communityContext";
import BottomSheetScreen from "../../components/BottomSheet/BottomSheetScreen";

const COMMUNITY_CATEGORY = [
  { title: "절약 꿀팁", data: "절약 꿀팁" },
  { title: "자유 게시판", data: "자유 게시판" },
];

const Modify = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { itemId } = route.params.params;
  const inputURL = `/community/${itemId}`;
  const { fetchData } = useCommunity();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [content, setContent] = useState("");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setCategory(selectedCategory);
  }, [selectedCategory]);

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

  const handleCategoryClick = () => {
    setOpen(!open);
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

  const postData = async () => {
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      const modifiedData = {};

      // 제목이 변경되었다면 수정된 제목을 추가
      if (title && title !== data.title) {
        modifiedData.title = title;
      }

      // 내용이 변경되었다면 수정된 내용을 추가
      if (content && content !== data.contents) {
        modifiedData.contents = content;
      }

      // 변경된 데이터가 없으면 early return
      if (Object.keys(modifiedData).length === 0) {
        Alert.alert("", "변경된 내용이 없습니다.");
        return;
      }

      const communityRequest = {
        title: modifiedData.title,
        contents: modifiedData.contents,
        type: category,
      };

      // 유효성 검사
      if (modifiedData.title.trim() === "") {
        Alert.alert("", "제목을 입력해주세요.");
        return;
      } else if (modifiedData.contents.trim() === "") {
        Alert.alert("", "내용을 입력해주세요.");
        return;
      } else if (modifiedData.title.length > 35) {
        Alert.alert("", "제목은 35자 이하로 입력해주세요.");
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

      const postResponse = await apiClient.patch(inputURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (postResponse.status === 200) {
        Alert.alert("", "게시글을 수정하였습니다.");
        fetchData();
        navigation.navigate("Community", { screen: "Community" });
      } else {
        Alert.alert("", "게시글을 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("error", "서버에 장애가 발생하였습니다.");
    }
  };

  const handlePost = () => {
    postData();
  };

  const fetchCommunityData = async () => {
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      console.log("데이터:", response.data);
      const DetailData = response.data.data;
      setTitle(DetailData.title);
      setContent(DetailData.contents);
      setSelectedCategory(DetailData.type);
      setData([DetailData]);
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
    fetchCommunityData();
  }, []);

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                  fontFamily: "SUITE_Bold",
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
                      fontWeight: 700,
                      borderColor: "#1F1F1F",
                      fontFamily: "SUITE_Bold",
                    }}
                  >
                    {/* 카테고리 선택 */}
                    {selectedCategory ? selectedCategory : item.type}
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
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#1F1F1F",
                  marginBottom: 8,
                  marginTop: 16,
                  paddingLeft: 12,
                  fontFamily: "SUITE_Medium",
                }}
              >
                제목
              </Text>
              <Input
                placeholder="제목을 입력하세요"
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
                  fontFamily: "SUITE_Medium",
                }}
              >
                내용
              </Text>
              <InputMax
                placeholder="내용을 입력하세요"
                placeholderTextColor="#000"
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
    fontWeight: 500,
    color: "#1F1F1F",
    fontFamily: "SUITE_Medium",
  },
});

export default Modify;
