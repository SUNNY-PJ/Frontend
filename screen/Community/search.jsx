import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { styles } from "./search.styels";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Line from "../../components/Line";
import { useNavigation } from "@react-navigation/native";
import apiClient from "../../api/apiClient";

const Search = () => {
  const navigation = useNavigation();
  const inputURL = "/community/board";

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
    // setText("");
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
    try {
      const paramsData = {
        sortType: "LATEST",
        pageSize: 20,
        search: text,
      };
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        params: paramsData,
      });

      console.log(response.data);

      if (response.data && Array.isArray(response.data)) {
        setData(response.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setData([]);
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
          <ScrollView
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            {data.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate("Detail", {
                    screen: "Detail",
                    params: {
                      itemId: item.id,
                      userId: item.userId,
                    },
                  })
                }
                activeOpacity={0.6}
              >
                <View key={index} style={{ backgroundColor: "#fff" }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      paddingRight: 20,
                      paddingLeft: 20,
                      paddingBottom: 16,
                      paddingTop: 16,
                      gap: 8,
                    }}
                  >
                    <Text style={[styles.type]}>{item.type}</Text>
                    <Text style={[styles.title]}>{item.title}</Text>
                    <View
                      style={{ display: "flex", flexDirection: "row", gap: 10 }}
                    >
                      <Text style={[styles.writer]}>{item.writer}</Text>
                      <Text style={[styles.writer]}>{item.createdAt}</Text>
                      <Text style={[styles.writer]}>조회 {item.viewCount}</Text>
                      <Text style={[styles.writer]}>
                        댓글 {item.commentCount}
                      </Text>
                    </View>
                  </View>
                  <Line h={1} color={"#C1C1C1"} />
                </View>
              </TouchableOpacity>
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
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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

export default Search;
