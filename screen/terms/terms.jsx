import React, { useEffect } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./terms.styles";
import { useNavigation } from "@react-navigation/native";
import { TermsData } from "../../data/termsData";
import apiClient from "../../api/apiClient";

const Terms = () => {
  const navigation = useNavigation();

  // sse connect
  const sseConnect = async () => {
    console.log("test123");
    const url = "/api/sse/subscribe";
    try {
      console.log("test12345");

      const response = await apiClient.get(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        // params: {},
      });
      console.log("sse connect test ::: 연결합니다....", response.data);
    } catch (error) {
      console.error("sse 에러:", error);
    }
  };

  // sse response
  // event:SSE CONNECTED
  // data:"SSE 연결"

  // event:heartbeat
  // data:"heartbeat message"

  // event:heartbeat
  // data:"heartbeat message"

  // event:heartbeat
  // data:"heartbeat message"

  // event:heartbeat
  // data:"heartbeat message"

  // event:heartbeat
  // data:"heartbeat message"

  // {"status":400}

  useEffect(() => {
    console.log("test");
    sseConnect();
  }, []);

  return (
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
      <Text style={styles.title}>이용 약관</Text>
      <ScrollView style={{ marginBottom: 200 }}>
        {TermsData.map((item, index) => (
          <View key={index} style={styles.section}>
            {item.title && <Text style={styles.termsTitle}>{item.title}</Text>}
            {item.text && <Text style={styles.termsText}>{item.text}</Text>}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Terms;
