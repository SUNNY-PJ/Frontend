import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { proxyUrl } from "../../constant/common";
import Input from "../../components/Input/input";
import LargeBtn from "../../components/Btn/largeBtn";
import LargeBtnDisable from "../../components/Btn/largeBtnDisable";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const SettingProfile = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [profileImageChanged, setProfileImageChanged] = useState(false);
  const [profileNicknameChanged, setProfileNicknameChanged] = useState(false);
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [profile, setProfile] = useState([]);
  const handleNameChange = (text) => {
    setName(text);
    setProfileNicknameChanged(true);
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
    setImages([result.assets[0].uri]);
    setSelectedImage(result.assets[0].uri);
    setProfileImageChanged(true);
  };

  // 첨부한 이미지 삭제
  const removeImage = (index) => {
    // 이미지 배열에서 선택한 이미지를 제거
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const profileRequest = {
    nickname: name,
  };

  const formData = new FormData();

  formData.append("profileRequest", JSON.stringify(profileRequest));

  images.forEach((image, index) => {
    const fileName = image.split("/").pop();
    const match = /\.(\w+)$/.exec(fileName ?? "");
    const type = match ? `image/${match[1]}` : `image`;
    formData.append("profile", {
      uri: image,
      name: fileName,
      type: type,
    });
  });

  const postImageData = async () => {
    const inputURL = "/mypage/profile";
    const url = proxyUrl + inputURL;
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log("데이터:", response.data);
      navigation.navigate("MyPage", { screen: "MyPage" });
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류:", error.response.data);
      } else {
        console.error("에러:", error);
      }
    }
  };

  const postNicknameData = async () => {
    const inputURL = "/auth/nickname";
    const cleanedURL = inputURL.replace(/[\u200B]/g, "");

    const url = proxyUrl + cleanedURL;
    const access_token = await AsyncStorage.getItem("access_token");
    console.log(access_token);
    console.log("별명을 등록합니다.");
    try {
      const params = {
        name: name,
      };

      const response = await axios.post(url, null, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
        params,
      });

      console.log("데이터:", response.data);
      navigation.navigate("MyPage", { screen: "MyPage" });
    } catch (error) {
      console.error("서버 응답 오류:", error.response.data);
      if (error.response.data.status === 403) {
        alert("이미 사용중인 닉네임입니다.");
      }
    }
  };

  const handlePostApiStart = () => {
    if (profileImageChanged && profileNicknameChanged) {
      postImageData();
      postNicknameData();
      alert("프로필을 변경했습니다.");
    } else if (profileImageChanged) {
      postImageData();
      alert("프로필 사진을 변경했습니다.");
    } else if (profileNicknameChanged) {
      postNicknameData();
      alert("닉네임을 변경했습니다.");
    }
  };

  const fetchData = async () => {
    const inputURL = `/mypage`;
    const url = proxyUrl + inputURL;
    const access_token = await AsyncStorage.getItem("access_token");
    console.log(access_token);

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log("프로필 정보:::", response.data);
      const profileData = response.data.data;
      setProfile([profileData]);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (profileImageChanged || profileNicknameChanged) {
      setIsAllFieldsFilled(true);
    } else {
      setIsAllFieldsFilled(false);
    }
  }, [profileImageChanged, profileNicknameChanged]);

  return (
    <View style={styles.container}>
      <View style={{ paddingLeft: 20 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MyPage", {
              screen: "MyPage",
            })
          }
        >
          <Image
            source={require("../../assets/prevBtn.png")}
            style={{ width: 24, height: 24, marginTop: 16 }}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 16,
          color: "#1F1F1F",
          fontWeight: 700,
          alignSelf: "center",
          bottom: 17,
        }}
      >
        프로필 설정
      </Text>
      {profile.map((item) => (
        <Pressable onPress={uploadImage}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={{
                width: 56,
                height: 56,
                alignSelf: "center",
                marginBottom: 28,
                borderRadius: 50,
              }}
            />
          ) : (
            <Image
              source={{ uri: item.profile }}
              // source={require("../../assets/myPage_profile.png")}
              style={{
                width: 56,
                height: 56,
                alignSelf: "center",
                marginBottom: 28,
                borderRadius: 50,
              }}
            />
          )}
        </Pressable>
      ))}
      {profile.map((item) => (
        <View style={styles.contentContainer}>
          <Text
            style={{
              paddingLeft: 12,
              fontSize: 16,
              color: "#1F1F1F",
              fontWeight: 500,
              marginBottom: 16,
            }}
          >
            닉네임
          </Text>
          <Input
            placeholder={item.name}
            inputValue={name}
            handleInputChange={handleNameChange}
          />
          <View style={{ marginTop: 323 }}>
            {isAllFieldsFilled ? (
              <LargeBtn text={"저장하기"} onClick={handlePostApiStart} />
            ) : (
              <LargeBtnDisable text={"저장하기"} />
            )}
          </View>
        </View>
      ))}
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
    paddingLeft: 28,
    paddingRight: 27,
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

export default SettingProfile;
