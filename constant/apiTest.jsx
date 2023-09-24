import React, { useEffect } from "react";
import axios from "axios";
import { View, Text, TouchableOpacity } from "react-native";

const ApiTest = () => {
  const proxyUrl = "http://43.201.176.22:8080";
  const getUrl = "/api/v1/friends";
  const postUrl = "​/consumption";

  const url_get = proxyUrl + getUrl;
  const url_post = proxyUrl + postUrl;
  console.log("url_get:::", url_get);
  console.log("url_post:::", url_post);

  const AccessToken =
    "eyJyZWdEYXRlIjoxNjk1NTQ0NTM3NDY0LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6ImNvbW1ldG9pX3llb25pQG5hdmVyLmNvbSIsImF1dGhvcml0aWVzIjoiUk9MRV9VU0VSIiwic3ViIjoiYWNjZXNzVG9rZW4iLCJleHAiOjE2OTU1NDYzMzd9.BmPyvQYt5yfvn1l00I11AOihA0yPG2qIpQHjuGcz-dbiZNblG7KQCAxUzk_FG7El3leNLWI5Htp2cJyM9EYXtQ";

  const fetchData = async () => {
    console.log("get 실행");
    try {
      const response = await axios.get(url_get, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          //   "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${AccessToken}`,
        },
      });
      console.log("데이터:", response.data);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const postData = async () => {
    console.log("post 실행");
    try {
      const bodyData = {
        // contents: "contents test 입니다",
        // title: "title test 입니다",
        // type: "type test 입니다",
        date_field: "2023-09-24",
        money: 0,
        name: "string",
        place: "string",
      };

      const response = await axios.post(url_post, {
        bodyData,
        // : JSON.stringify(bodyData),
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          //   "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${AccessToken}`,
        },
      });

      console.log(response);
      //   const data = await response.json();
      console.log("데이터:", response.data);
      console.log("error ::", response.data.error);
      console.log("error status::", response.data.status);
      console.log("error message::", response.data.message);
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
