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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Line from "../../components/Line";
import { proxyUrl } from "../../constant/common";

const Search = () => {
  const inputURL = "/community/board";
  const url = proxyUrl + inputURL;

  const RECENT_SEARCHES_KEY = "recent_searches";
  const [text, setText] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadRecentSearches = async () => {
      try {
        const savedSearches = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
        if (savedSearches) {
          setRecentSearches(JSON.parse(savedSearches));
        }
      } catch (e) {
        console.error("Error loading recent searches", e);
      }
    };

    loadRecentSearches();
  }, []);

  const saveRecentSearches = async (searches) => {
    try {
      const jsonValue = JSON.stringify(searches);
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, jsonValue);
    } catch (e) {
      console.error("Error saving recent searches", e);
    }
  };

  const handleInputChange = (data) => {
    setText(data);
  };

  const handleSearch = () => {
    fetchData();
    const newSearches = [
      text,
      ...recentSearches.filter((search) => search !== text),
    ].slice(0, 10);
    setRecentSearches(newSearches);
    saveRecentSearches(newSearches);
    setText("");
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    saveRecentSearches([]);
  };

  const removeSearchTerm = (index) => {
    const updatedSearches = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(updatedSearches);
    saveRecentSearches(updatedSearches);
  };

  const fetchData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");

    try {
      const paramsData = {
        sortType: "LATEST",
        pageSize: 20,
        search: text,
      };
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
        params: paramsData,
      });

      // Check if data exists and is an array
      if (response.data && Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        setData([]); // Set data to an empty array if response is not as expected
      }
    } catch (error) {
      console.error("Search error:", error);
      setData([]); // Reset data in case of error
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={{ paddingRight: 20, paddingLeft: 20 }}>
          <View style={styles.keyboard}>
            <TextInput
              placeholderTextColor="#C1C1C1"
              placeholder="원하는 글, 검색어를 찾아보세요"
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
        {/* 데이터 있을 떄만 */}
        {data.length > 0 ? (
          <View style={styles.recentSearchesHeader}></View>
        ) : (
          <View style={styles.recentSearchesHeader}>
            <Text style={styles.text}>최근 검색어</Text>

            <View style={{ flexDirection: "row", gap: 7 }}>
              <TouchableOpacity onPress={clearRecentSearches}>
                <Text style={styles.text}>전체삭제</Text>
              </TouchableOpacity>
              <View
                style={{ backgroundColor: "#C1C1C1", width: 1, height: 14 }}
              />
              <Text style={styles.text}>자동저장끄기</Text>
            </View>
          </View>
        )}
        {data.length > 0 ? (
          <ScrollView>
            {data.map((item, index) => (
              <View key={index} style={{ backgroundColor: "#fff" }}>
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
        ) : recentSearches.length > 0 ? (
          <ScrollView>
            {recentSearches.map((search, index) => (
              <View key={index} style={{ backgroundColor: "#fff" }}>
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
                  <Text style={styles.recentSearch}>{search}</Text>
                  <TouchableOpacity onPress={() => removeSearchTerm(index)}>
                    <Image
                      source={require("../../assets/grayClose.png")}
                      style={{ width: 24, height: 24 }}
                    />
                  </TouchableOpacity>
                </View>
                <Line h={1} color={"#C1C1C1"} />
              </View>
            ))}
          </ScrollView>
        ) : null}
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
    fontWeight: 500,
    fontSize: 16,
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
    fontWeight: 500,
    color: "#1F1F1F",
  },
});

export default Search;
