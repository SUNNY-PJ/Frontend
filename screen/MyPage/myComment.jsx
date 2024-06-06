import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { styles } from "./my.styles";
import Line from "../../components/Line";
import { useNavigation } from "@react-navigation/native";
import { formatDate } from "../../constant/formatData/format";
import apiClient from "../../api/apiClient";

const MyComment = () => {
  const navigation = useNavigation();
  const inputURL = "/users/comment";
  const windowHeight = Dimensions.get("window").height;

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      const myWriteData = response.data;
      console.log(myWriteData);
      setData(Array.isArray(myWriteData) ? myWriteData : []);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <ScrollView style={{ height: windowHeight - 259 - 65 }}>
          {data.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigation.navigate("Detail", {
                  screen: "Detail",
                  params: {
                    itemId: item.communityId,
                    userId: item.userId,
                  },
                })
              }
              activeOpacity={0.6}
            >
              <View style={styles.box}>
                <Text style={styles.title}>{item.content}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.description}>{item.writer}</Text>
                  <Text style={styles.description}>
                    {formatDate(item.createdDate)}
                  </Text>
                </View>
              </View>
              <Line color={"#C1C1C1"} h={1} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default MyComment;
