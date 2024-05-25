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
import CompetitionMsg from "../../components/Modal/battle/CompetitionMsg";
import ReportResult from "../../components/Modal/report/reportResult";
import ReportReceive from "../../components/Modal/report/reportReceive";

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
  const [reportResultVisible, setReportResultVisible] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);
  const [reportResult, setReportResult] = useState("");
  const [reportReason, setReportReason] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [reportUser, setReportUser] = useState("");
  const [reportContent, setReportContent] = useState("");
  const [reportCount, setReportCount] = useState(0);

  console.log(reportResultVisible);

  const handleItemClick = async (
    alarmId,
    type,
    id,
    userId,
    content,
    name,
    isFriend,
    isRecieve,
    subType,
    reason,
    date,
    user,
    reportContent,
    reportCount
  ) => {
    setReportReason(reason);
    setReportDate(date);
    setReportUser(user);
    setReportContent(reportContent);
    setReportCount(reportCount);
    setClickedItemIds((prevClickedItemIds) => {
      const updatedClickedItemIds = prevClickedItemIds.includes(alarmId)
        ? prevClickedItemIds.filter((id) => id !== alarmId)
        : [...prevClickedItemIds, alarmId];

      // AsyncStorage에 JSON 문자열로 저장
      AsyncStorage.setItem(
        "clickedItemIds",
        JSON.stringify(updatedClickedItemIds)
      )
        .then(() =>
          navigateToScreen(
            type,
            id,
            userId,
            content,
            name,
            isFriend,
            isRecieve,
            subType
          )
        )
        .catch((error) => console.error("AsyncStorage 저장 오류:", error));

      return updatedClickedItemIds;
    });
  };

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

  useEffect(() => {
    fetchData();
    loadClickedItemIds();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(700).then(() => {
      console.log(refreshing);
      setRefreshing(false);
      fetchData();
      loadClickedItemIds();
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
        setRecentData(todayData);
        setPastData(pastData);
      }
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류: alarm", error.response.data);
      } else {
        console.error("에러:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigateToScreen = (
    type,
    itemId,
    userId,
    content,
    name,
    isFriend,
    isRecieve,
    subType
  ) => {
    // 친구
    if (type === "친구") {
      if (content.includes("친구를 신청했어요") && !isFriend) {
        navigation.replace("MainScreen", {
          screen: "FriendsList",
          params: {
            friendModalContent: {
              name: name,
              userId: itemId,
              open: true,
            },
          },
        });
      } else {
        navigation.navigate("FriendsList");
      }
    }
    // 댓글
    else if (type === "댓글") {
      // navigation.navigate("Community");
      navigation.navigate("Detail", {
        screen: "Detail",
        params: {
          itemId: itemId,
          userId: userId,
        },
      });
    }
    // 대결
    else if (type === "대결") {
      if (content.includes("신청") && isRecieve) {
        navigation.replace("MainScreen", {
          screen: "FriendsList",
          params: {
            battleModalContent: {
              name: name,
              userId: userId,
              open: true,
            },
          },
        });
      }
      if (content.includes("대결을 거절") || content.includes("대결을 수락")) {
        if (isRecieve) {
          navigation.replace("MainScreen", {
            screen: "FriendsList",
            params: {
              resultModalContent: {
                name: name,
                result: content.includes("거절") ? "거절" : "승낙",
                open: true,
              },
            },
          });
        } else {
          navigation.navigate("FriendsList");
        }
      } else {
        navigation.navigate("FriendsList");
      }
    }
    // 신고
    else if (type === "신고") {
      if (subType === "경고") {
        setReportVisible(true);
      } else {
        setReportResult(subType);
        setReportResultVisible(true);
      }
    }
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
                return (
                  <TouchableOpacity
                    key={item.alarmId}
                    style={[
                      styles.section,
                      clickedItemIds.includes(item.alarmId) &&
                        styles.clickedItemStyle,
                    ]}
                    activeOpacity={0.8}
                    onPress={() =>
                      handleItemClick(
                        item.alarmId,
                        item.notificationType,
                        item.id,
                        item.userId,
                        item.notificationContent,
                        item.postAuthor,
                        item.isFriend || "",
                        item.isRecieveCompetition || "",
                        item.subType,
                        item.ReportReason || "",
                        item.reportCreatedAt || "",
                        item.reportUser || "",
                        item.reportContent || "",
                        item.userReportCount || 0
                      )
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
                      <Text
                        style={styles.contentText}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
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
                return (
                  <TouchableOpacity
                    key={item.alarmId}
                    style={[
                      styles.section,
                      clickedItemIds.includes(item.alarmId) &&
                        styles.clickedItemStyle,
                    ]}
                    activeOpacity={0.8}
                    onPress={() =>
                      handleItemClick(
                        item.alarmId,
                        item.notificationType,
                        item.id,
                        item.userId,
                        item.notificationContent,
                        item.postAuthor,
                        item.isFriend || "",
                        item.isRecieveCompetition || "",
                        item.subType,
                        item.ReportReason || "",
                        item.reportCreatedAt || "",
                        item.reportUser || "",
                        item.reportContent || "",
                        item.userReportCount || 0
                      )
                    }
                  >
                    <Image
                      source={
                        item.profileImg
                          ? { uri: item.profileImg }
                          : require("../../assets/myPage_profile.png")
                      }
                      style={{ width: 60, height: 60, borderRadius: 50 }}
                    />
                    <View>
                      <Text style={styles.titleText}>{item.title}</Text>
                      <Text
                        style={styles.contentText}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
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
      <ReportResult
        isVisible={reportResultVisible}
        onCancel={() => setReportResultVisible(false)}
        result={reportResult}
        reportReason={reportReason}
        reportDate={reportDate}
        reportUser={reportUser}
        reportContent={reportContent}
      />
      <ReportReceive
        isVisible={reportVisible}
        onCancel={() => setReportVisible(false)}
        count={reportCount}
        date={reportDate}
        content={reportContent}
        reason={reportReason}
      />
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
    color: "#1F1F1F",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 8,
    fontFamily: "SUITE_Bold",
  },
  dateText: {
    fontSize: 12,
    fontFamily: "SUITE",
    color: "#1F1F1F",
  },
  nameText: {
    fontSize: 12,
    fontFamily: "SUITE",
    color: "#1F1F1F",
  },
  contentText: {
    fontSize: 16,
    fontFamily: "SUITE",
    color: "#1F1F1F",
  },
  titleText: {
    fontSize: 12,
    fontFamily: "SUITE_Bold",
    color: "#5C5C5C",
  },
  bottomSection: { flexDirection: "row", gap: 8, marginTop: 6 },
  clickedItemStyle: {
    opacity: 0.5,
  },
});

export default Alarm;
