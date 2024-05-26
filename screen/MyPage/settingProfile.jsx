import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { styles } from "./settingProfile.styles";
import InputNickName from "../../components/Input/inputNickname";
import LargeBtn from "../../components/Btn/largeBtn";
import LargeBtnDisable from "../../components/Btn/largeBtnDisable";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import ImageActionSheet from "../../components/BottomSheet/ImageActionSheet";
import apiClient from "../../api/apiClient";

const SettingProfile = () => {
  const navigation = useNavigation();
  const [isActionSheetVisible, setActionSheetVisible] = useState(false);
  const [name, setName] = useState("");
  const [profileImageChanged, setProfileImageChanged] = useState(false);
  const [profileNicknameChanged, setProfileNicknameChanged] = useState(false);
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [profile, setProfile] = useState([]);
  const [isValidName, setIsValidName] = useState(false);

  const handleNameChange = (text) => {
    setName(text);
    setProfileNicknameChanged(true);
    if (text === "") {
      setProfileNicknameChanged(false);
    }
  };

  const handleValidation = (isValid) => {
    setIsValidName(isValid);
  };

  useEffect(() => {
    setIsAllFieldsFilled(isValidName);
  }, [isValidName]);

  const [request, setRequest] = ImagePicker.useMediaLibraryPermissions();
  const [images, setImages] = useState([]);
  // const [serverImageURL, setServerImageURL] = useState(
  //   "https://sunny-pj.s3.ap-northeast-2.amazonaws.com/Profile+Image.png"
  // );

  const uploadImage = async () => {
    console.log("click");

    let permission = request;
    if (!permission?.granted) {
      // 권한 요청
      permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        // 사용자가 권한을 거부한 경우
        Alert.alert("", "갤러리 접근 권한이 필요합니다.");
        return;
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
      return;
    }

    console.log(result);
    // 이미지 업로드 결과 및 이미지 경로 업데이트
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

  const handleImagePress = (index) => {
    setActionSheetVisible(true);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setProfileImageChanged(true);
    setActionSheetVisible(false);
  };

  const handleSelectImage = () => {
    uploadImage();
    setActionSheetVisible(true);
  };

  const postImageData = async () => {
    const inputURL = "/users/profile";

    // FormData 객체 생성
    const formData = new FormData();
    formData.append("profileRequest", JSON.stringify({ nickname: name }));

    // 선택된 이미지가 있는 경우에만 서버로 전송합니다.
    if (selectedImage) {
      const fileName = selectedImage.split("/").pop();
      const match = /\.(\w+)$/.exec(fileName);
      const type = match ? `image/${match[1]}` : `image`;
      formData.append("profile", {
        uri: selectedImage,
        name: fileName,
        type: type,
      });
    } else {
      // 선택된 이미지가 없는 경우(이미지를 삭제한 경우), 기본 이미지 URL을 전송합니다.
      formData.append(
        "profile",
        JSON.stringify({
          imageUrl:
            "https://sunny-pj.s3.ap-northeast-2.amazonaws.com/Profile+Image.png",
        })
      );
    }

    try {
      const response = await apiClient.post(inputURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      navigation.navigate("MyPage", { screen: "MyPage" });
    } catch (error) {
      // 에러 핸들링 로직
    }
  };

  const postNicknameData = async () => {
    const inputURL = "/apple/auth/nickname";
    try {
      const params = {
        name: name,
      };

      const response = await apiClient.post(inputURL, null, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        params,
      });
      if (response.data.status === 200) {
        navigation.navigate("MyPage", { screen: "MyPage" });
      }
    } catch (error) {
      console.error("서버 응답 오류: setting profile", error.response.data);
      if (error.response.status === 403) {
        Alert.alert("", "이미 사용중인 닉네임입니다.");
      }
    }
  };

  const handlePostApiStart = () => {
    if (profileImageChanged && profileNicknameChanged) {
      postImageData();
      postNicknameData();
      Alert.alert("", "프로필을 변경했습니다.");
    } else if (profileImageChanged) {
      postImageData();
      Alert.alert("", "프로필 사진을 변경했습니다.");
    } else if (profileNicknameChanged) {
      postNicknameData();
      Alert.alert("", "닉네임을 변경했습니다.");
    }
  };

  const fetchData = async () => {
    const inputURL = `/users`;

    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      console.log("프로필 정보:::", response.data);
      const profileData = response.data;
      setProfile([profileData]);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (profileImageChanged) {
      if (profileNicknameChanged) {
        setIsAllFieldsFilled(isValidName);
      } else {
        setIsAllFieldsFilled(true);
      }
    } else if (profileNicknameChanged) {
      setIsAllFieldsFilled(isValidName);
    } else {
      setIsAllFieldsFilled(false);
    }
  }, [profileImageChanged, profileNicknameChanged, isValidName, name]);

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
            style={styles.prevImg}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.topTitle}>프로필 설정</Text>
      {profile.map((item, index) => (
        <Pressable onPress={() => handleImagePress(index)} key={index}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={styles.profileImage}
            />
          ) : profileImageChanged ? (
            <Image
              source={require("../../assets/myPage_profile.png")}
              style={styles.profileImage}
            />
          ) : (
            <Image source={{ uri: item.profile }} style={styles.profileImage} />
          )}
        </Pressable>
      ))}
      {profile.map((item, index) => (
        <View style={styles.contentContainer} key={index}>
          <Text style={styles.nicknameText}>닉네임</Text>
          <InputNickName
            placeholder={item.name}
            inputValue={name}
            handleInputChange={handleNameChange}
            onValidation={handleValidation}
          />
          <Text style={styles.notiText}>
            * 2~10자 이내, 특수문자 및 숫자 사용 가능, 이모지 사용 불가
          </Text>
          <View style={{ marginTop: 23 }}>
            {isAllFieldsFilled ? (
              <LargeBtn text={"저장하기"} onClick={handlePostApiStart} />
            ) : (
              <LargeBtnDisable text={"저장하기"} />
            )}
          </View>
        </View>
      ))}
      <ImageActionSheet
        isVisible={isActionSheetVisible}
        onClose={() => setActionSheetVisible(false)}
        onRemove={handleRemoveImage}
        onSelect={handleSelectImage}
      />
    </View>
  );
};

export default SettingProfile;
