import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Line from "../../components/Line";
import apiClient from "../../api/apiClient";

const SearchCommunity = ({ searchTerms }) => {
  const inputURL = "/community/board";

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const paramsData = {
        //   page: 1,
        //   size: 10,
        sortType: "LATEST",
        pageSize: 20,
        search: searchTerms,
        // boardType: category,
      };
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        params: paramsData,
      });
      console.log("데이터:111", response.data.data);

      setData(response.data.data);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerms]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={{ paddingRight: 20, paddingLeft: 20 }}>
          <View style={styles.keyboard}>
            <TextInput
              placeholderTextColor="#C1C1C1"
              placeholder={"원하는 글, 검색어를 찾아보세요"}
              value={text}
              onChangeText={handleInputChange}
              style={styles.input}
            />
            <TouchableOpacity
              style={[styles.button]}
              onPress={handleSearch}
              disabled={!text}
            >
              <Image
                source={require("../../assets/searchIcon.png")}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          {data.map((item, index) => (
            <View
              style={{
                backgroundColor: "#fff",
              }}
              key={item.title}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingRight: 20,
                  paddingLeft: 20,
                  paddingBottom: 16,
                  paddingTop: 16,
                }}
              >
                <Text>{item.type}</Text>
                <Text>{item.title}</Text>
                <Text>{item.writer}</Text>
                <Text>{item.createdAt}</Text>
                <Text>조회 {item.viewCount}</Text>
                <Text>댓글 {item.commentCount}</Text>
              </View>
              <Line h={1} color={"#C1C1C1"} />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
    // flex: 1,
  },
  contentContainer: {
    // marginBottom: 40,
    paddingTop: 69,
    // paddingRight: 20,
    // paddingLeft: 20,
  },
  input: {
    height: 30,
    borderRadius: 48,
    borderColor: "transparent",
    borderWidth: 1.5,
    width: "84%",
    backgroundColor: "#F1F1F1",
  },
  keyboard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 42,
    borderRadius: 48,
    borderColor: "transparent",
    borderWidth: 1.5,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#F1F1F1",
  },
  text: {
    fontSize: 16,
    fontFamily: "SUITE",
    color: "#C1C1C1",
  },
  recentSearchesHeader: {
    marginTop: 25,
    marginBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
    paddingLeft: 20,
  },
  recentSearch: {
    fontSize: 20,
    fontFamily: "SUITE",
    color: "#1F1F1F",
  },
});

export default SearchCommunity;
