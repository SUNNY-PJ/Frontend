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

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Alarm = () => {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;
  const [refreshing, setRefreshing] = useState(false);
  const [pastData, setPastData] = useState([]);
  const [recentData, setRecentData] = useState([]);

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
              {recentData.map((item, index) => (
                <View style={styles.section}>
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
                </View>
              ))}
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
              {pastData.map((item, index) => (
                <View style={styles.section}>
                  <Image
                    // source={require("../../assets/myPage_profile.png")}
                    source={{ uri: item.profile }}
                    style={{ width: 60, height: 60 }}
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
                </View>
              ))}
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
});

export default Alarm;
