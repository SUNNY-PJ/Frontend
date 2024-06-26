import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Alert,
  Dimensions,
} from "react-native";
import { styles } from "./modify.styles";
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
const { width } = Dimensions.get("window");
const isLargeScreen = width > 375;

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
      const postResponse = await apiClient.put(inputURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Alert.alert("", "게시글을 수정하였습니다.");
      fetchData();
      navigation.navigate("Community", { screen: "Community" });
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
      const DetailData = response.data;
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
              <Text style={styles.mainTitle}>게시글 수정</Text>
              <View style={styles.topSection}>
                <SmallBtn
                  title={"취소"}
                  color={"#E8E9E8"}
                  onClick={() =>
                    navigation.navigate("Community", {
                      screen: "Community",
                    })
                  }
                />
                <SmallBtn title={"수정"} onClick={handlePost} />
              </View>
              {/* 카테고리 선택 */}
              <TouchableOpacity onPress={handleCategoryClick}>
                <View style={styles.top}>
                  <Text style={styles.categoryText}>
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
                placeholder="제목을 입력하세요"
                inputValue={title}
                handleInputChange={handleTitleChange}
              />
              <Text style={styles.contentText}>내용</Text>
              <InputMax
                placeholder={
                  "내용을 입력하세요. (부적절하거나 불쾌감을 줄 수 있는 컨텐츠는 제재를 받을 수 있습니다)"
                }
                placeholderTextColor="#000"
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
                      style={styles.removeImgSection}
                    >
                      <Image
                        source={require("../../assets/deletePhoto.png")}
                        style={styles.removeImgSection}
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

export default Modify;
