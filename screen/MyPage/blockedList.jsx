import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { styles } from "./blockedList.styles";
import { useNavigation } from "@react-navigation/native";
import Line from "../../components/Line";
import apiClient from "../../api/apiClient";

const BlockedListScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const inputURL = `/users/block`;
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      console.log("차단된 사용자 조회", response.data);
      setData(response.data);
    } catch (error) {
      if (error.response) {
        Alert.alert("error", error.response.data);
        console.error("서버 응답 메세지:", error.message);
      } else {
        console.error("에러:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const UnblockData = async (id, name) => {
    const inputURL = `/users/${id}/block`;
    try {
      const response = await apiClient.delete(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      console.log(response.data);
      Alert.alert("", `${name}님을 차단 해제했습니다.`);
      fetchData();
    } catch (error) {
      console.error("에러:", error);
      Alert.alert("error", "차단 해제 중 에러가 발생했습니다.");
    }
  };

  const handleUnblock = (id, name) => {
    UnblockData(id, name);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={{}}>
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
        <Text style={styles.title}>차단 관리</Text>
        <Line h={1} color={"#C1C1C1"} />
        <ScrollView style={{ marginBottom: 200 }}>
          {data.map((item) => (
            <>
              <View style={styles.section} key={item.id}>
                <View style={{ flexDirection: "row" }}>
                  <Image source={{ uri: item.profile }} style={styles.icon} />
                  <Text style={styles.name}>{item.nickname}</Text>
                </View>
                <TouchableOpacity
                  style={{ alignSelf: "center" }}
                  onPress={() => handleUnblock(item.id, item.nickname)}
                >
                  <Text style={styles.btn}>차단 해제</Text>
                </TouchableOpacity>
              </View>
              <Line h={1} color={"#C1C1C1"} />
            </>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default BlockedListScreen;
