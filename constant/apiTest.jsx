import React, { useEffect } from "react";
import axios from "axios";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ApiTest = () => {
  const proxyUrl = "http://43.201.176.22:8080";
  const getUrl = "/friends";
  const postUrl = "/alarm";

  const cleanedURL = postUrl.replace(/[\u200B]/g, "");

  const url_get = proxyUrl + getUrl;
  const url_post = proxyUrl + cleanedURL;
  console.log("url_get:::", url_get);
  console.log("url_post:::", url_post);

  const fetchData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    console.log(access_token);
    console.log("get 실행");
    try {
      const response = await axios.get(url_get, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          //   "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log("데이터:", response.data);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const postData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    console.log("post 실행");
    try {
      const bodyData = {
        body: "하이하이하이",
        friendsId: 1,
        title: "누구쇼",
      };

      console.log(bodyData);

      const response = await axios.post(url_post, bodyData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log(response);
      //   const data = await response.json();
      console.log("데이터:", response.data);
      console.log(" status::", response.data.status);
      console.log(" message::", response.data.message);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const handleApiTestStart = () => {
    fetchData();
  };

  const handlePostApiTestStart = () => {
    postData();
  };

  return (
    <View style={{ height: "100%", backgroundColor: "pink" }}>
      <Text
        style={{
          justifyContent: "center",
          alignSelf: "center",
          marginBottom: 100,
        }}
      >
        api test 화면입니다.
      </Text>
      <View style={{ gap: 30 }}>
        <TouchableOpacity onPress={handleApiTestStart}>
          <Text style={{ alignSelf: "center", fontSize: 50 }}>Get Click</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePostApiTestStart}>
          <Text style={{ alignSelf: "center", fontSize: 50 }}>Post Click</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ApiTest;
