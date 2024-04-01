import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Line from "../../components/Line";
import apiClient from "../../api/apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Alarm = () => {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;
  const [refreshing, setRefreshing] = useState(false);
  const [pastData, setPastData] = useState([]);
  const [recentData, setRecentData] = useState([]);
  const [clickedItemIds, setClickedItemIds] = useState([]);

  const handleItemClick = async (uniqueIdentifier, title) => {
    let updatedClickedItemIds = [...clickedItemIds];
    if (updatedClickedItemIds.includes(uniqueIdentifier)) {
      // 이미 클릭된 항목이면 제거
      updatedClickedItemIds = updatedClickedItemIds.filter(
        (id) => id !== uniqueIdentifier
      );
    } else {
      // 새로 클릭된 항목이면 추가
      updatedClickedItemIds.push(uniqueIdentifier);
    }

    try {
      // AsyncStorage에 JSON 문자열로 저장
      await AsyncStorage.setItem(
        "clickedItemIds",
        JSON.stringify(updatedClickedItemIds)
      );
      setClickedItemIds(updatedClickedItemIds);
      navigateToScreen(title);
    } catch (error) {
      console.error("AsyncStorage 저장 오류:", error);
    }
  };

  useEffect(() => {
    const loadClickedItemIds = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("clickedItemIds");
        const loadedClickedItemIds =
          jsonValue != null ? JSON.parse(jsonValue) : [];
        setClickedItemIds(loadedClickedItemIds);
      } catch (error) {
        console.error("AsyncStorage 로딩 오류:", error);
      }
    };

    fetchData();
    loadClickedItemIds();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(700).then(() => {
      console.log(refreshing);
      setRefreshing(false);
      // 데이터를 새로고침
      fetchData();
    });
  }, []);

  const fetchData = async () => {
    const inputURL = "/alarm";
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      if (response.status === 200) {
        const AlarmData = response.data.data;
        console.log("알림 데이터:", AlarmData);
        const todayData = AlarmData.filter((item) => item.isToday);
        const pastData = AlarmData.filter((item) => !item.isToday);
        setRecentData(todayData); // 오늘 날짜 데이터
        setPastData(pastData); // 과거 날짜 데이터
      }
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류:", error.response.data);
      } else {
        console.error("에러:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigateToScreen = (title) => {
    // 친구와 대결이 포함된 타이틀 처리
    if (title.includes("친구") || title.includes("대결")) {
      navigation.navigate("FriendsList");
    }
    // 댓글, 답글이 포함된 타이틀 처리
    else if (title.includes("댓글") || title.includes("답글")) {
      navigation.navigate("Community");
    }
    // 추가적인 타이틀 조건에 따른 네비게이션을 여기에 구현할 수 있습니다.
  };

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
            style={{ width: 24, height: 24, marginTop: 25 }}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 22,
          color: "#1F1F1F",
          fontWeight: 700,
          alignSelf: "center",
          bottom: 22,
          fontFamily: "SUITE_Bold",
        }}
      >
        알림
      </Text>
      <ScrollView
        style={{ marginBottom: 200 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {recentData.length > 0 && (
          <View>
            <View style={{ backgroundColor: "#fff" }}>
              <Text style={styles.dayText}>오늘</Text>
            </View>
            <View style={{ backgroundColor: "#fff" }}>
              {recentData.map((item, index) => {
                const uniqueIdentifier = `${item.id}-${item.createdAt}`;
                return (
                  <TouchableOpacity
                    key={uniqueIdentifier} // 고유한 key로 uniqueIdentifier 사용
                    style={[
                      styles.section,
                      clickedItemIds.includes(uniqueIdentifier) &&
                        styles.clickedItemStyle,
                    ]}
                    activeOpacity={0.8}
                    onPress={() =>
                      handleItemClick(uniqueIdentifier, item.title)
                    }
                  >
                    <Image
                      source={
                        item.profileImg
                          ? { uri: item.profileImg }
                          : require("../../assets/myPage_profile.png")
                      }
                      // source={require("../../assets/myPage_profile.png")}
                      style={{ width: 60, height: 60, borderRadius: 50 }}
                    />
                    <View>
                      <Text style={styles.titleText}>{item.title}</Text>
                      <Text style={styles.contentText}>
                        {item.notificationContent}
                      </Text>
                      <View style={styles.bottomSection}>
                        <Text style={styles.nameText}>{item.postAuthor}</Text>
                        <Text style={styles.dateText}>{item.createdAt}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}

              <Line h={1} color={"#C1C1C1"} />
            </View>
          </View>
        )}
        <Line h={2} color={"#C1C1C1"} />
        {pastData.length > 0 && (
          <View>
            <View style={{ backgroundColor: "#fff" }}>
              <Text style={styles.dayText}>지난 30일</Text>
            </View>
            <View style={{ backgroundColor: "#fff" }}>
              {pastData.map((item, index) => {
                const uniqueIdentifier = `${item.id}-${item.createdAt}`;
                return (
                  <TouchableOpacity
                    key={uniqueIdentifier} // 고유한 key로 uniqueIdentifier 사용
                    style={[
                      styles.section,
                      clickedItemIds.includes(uniqueIdentifier) &&
                        styles.clickedItemStyle,
                    ]}
                    activeOpacity={0.8}
                    onPress={() =>
                      handleItemClick(uniqueIdentifier, item.title)
                    }
                  >
                    <Image
                      // source={require("../../assets/myPage_profile.png")}
                      source={
                        item.profileImg
                          ? { uri: item.profileImg }
                          : require("../../assets/myPage_profile.png")
                      }
                      style={{ width: 60, height: 60, borderRadius: 50 }}
                    />
                    <View>
                      <Text style={styles.titleText}>{item.title}</Text>
                      <Text style={styles.contentText}>
                        {item.notificationContent}
                      </Text>
                      <View style={styles.bottomSection}>
                        <Text style={styles.nameText}>{item.postAuthor}</Text>
                        <Text style={styles.dateText}>{item.createdAt}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}

              <Line h={1} color={"#C1C1C1"} />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  section: {
    flexDirection: "row",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    gap: 12,
    borderBottomColor: "#C1C1C1",
    borderBottomWidth: 1,
  },
  dayText: {
    fontSize: 20,
    fontWeight: 700,
    color: "#1F1F1F",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 8,
    fontFamily: "SUITE_Bold",
  },
  dateText: {
    fontSize: 12,
    fontWeight: 500,
    fontFamily: "SUITE",
    color: "#1F1F1F",
  },
  nameText: {
    fontSize: 12,
    fontWeight: 500,
    fontFamily: "SUITE",
    color: "#1F1F1F",
  },
  contentText: {
    fontSize: 16,
    fontWeight: 500,
    fontFamily: "SUITE",
    color: "#1F1F1F",
  },
  titleText: {
    fontSize: 12,
    fontWeight: 700,
    fontFamily: "SUITE_Bold",
    color: "#5C5C5C",
  },
  bottomSection: { flexDirection: "row", gap: 8, marginTop: 6 },
  clickedItemStyle: {
    opacity: 0.5,
  },
});

export default Alarm;
