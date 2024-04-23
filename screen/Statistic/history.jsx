import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  Animated,
  SafeAreaView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import CalendarComponent from "../../components/Calendar/calendar";
import apiClient from "../../api/apiClient";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");
const isLargeScreen = width > 375;

const History = () => {
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  // 숫자에 세 자리마다 쉼표를 추가하는 함수
  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const translateY = new Animated.Value(0);

  const onDataFetched = (data) => {
    setData(data);
  };

  useEffect(() => {
    onDataFetched;
  }, [data]);

  const renderRightActions = (consumptionId) => {
    return (
      <TouchableOpacity
        onPress={() => handleChatRoomDelete(consumptionId)}
        activeOpacity={0.6}
      >
        <View style={styles.deleteBox}>
          <Text style={styles.deleteText}>삭제</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleChatRoomDelete = (consumptionId) => {
    deleteData(consumptionId);
  };

  // 지출 기록 삭제
  const deleteData = async (consumptionId) => {
    const inputURL = `/consumption/${consumptionId}`;
    try {
      const response = await apiClient.delete(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      const consumptionDeleteData = response.data;
      console.log(consumptionDeleteData);
      Alert.alert("", "지출 기록을 삭제했습니다.");
      onDataFetched();
    } catch (error) {
      console.error("에러:", error);
    }
  };

  // 지출 기록 조회
  const fetchData = async () => {
    const inputURL = `/consumption`;
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      // 가져온 데이터로 상태 업데이트
      const fetchedData = response.data.data;
      // setData(fetchedData);
      // 마킹 정보 업데이트
      updateMarkedDates(fetchedData);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  // useEffect 내에서 fetchData 호출
  useEffect(() => {
    fetchData();
  }, []);

  const updateMarkedDates = (fetchedData) => {
    let newMarkedDates = {};

    fetchedData.forEach((item) => {
      const date = item.dateField.replace(/\./g, "-");
      newMarkedDates[date] = {
        marked: true,
        dotColor: "#FFA851",
      };
    });

    setMarkedDates(newMarkedDates);
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const handleModify = (consumptionId) => {
    // navigation.replace("Note", {
    navigation.navigate("Note", {
      screen: "Note",
      params: {
        consumptionId: consumptionId,
        screen: "history",
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <CalendarComponent
          onDataFetched={onDataFetched}
          markedDates={markedDates}
        />
        {/* <RangeCalendar /> */}
      </View>
      {/* {data.map((item, index) => ( */}
      <SafeAreaView style={styles.bottomSection}>
        <ScrollView style={{ height: windowHeight - 700, flex: 1 }}>
          {Array.isArray(data) &&
            data.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => handleModify(item.id)}
                key={item.id}
              >
                <Swipeable
                  renderRightActions={() => renderRightActions(item.id)}
                  // onSwipeableOpen={() => handleChatRoomDelete(item.id)}
                  overshootRight={false}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                      paddingTop: 10,
                      paddingBottom: 10,
                      backgroundColor: "#FFFBF6",
                      paddingRight: 20,
                      marginLeft: 10,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.bottomBar} />
                      <Text style={styles.bottomText}>{item.name}</Text>
                    </View>
                    <Text style={styles.bottomPriceText}>
                      {formatNumberWithCommas(item.money)}원
                    </Text>
                  </View>
                </Swipeable>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </SafeAreaView>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.addItem}
        onPress={() => navigation.navigate("Note")}
      >
        <Animated.Image
          source={require("../../assets/add.png")}
          style={{
            width: 52,
            height: 52,
            transform: [{ translateY }],
            // marginBottom: 15,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFBF6",
    minHeight: "100%",
  },
  contentContainer: {
    marginTop: isLargeScreen ? 24 : 0,
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: "center",
    marginTop: 12,
  },
  bottomSection: {
    flexDirection: "row",
    paddingLeft: 20,
    // marginRight: 20,
    marginBottom: 16,
    marginTop: 16,
  },
  bottomBar: {
    width: 4,
    height: 32,
    backgroundColor: "#5C5C5C",
    borderRadius: 10,
  },
  bottomText: {
    color: "#1F1F1F",
    fontSize: 16,
    fontFamily: "SUITE_Bold",
    marginLeft: 16,
    alignSelf: "center",
  },
  bottomPriceText: {
    color: "#1F1F1F",
    fontSize: 16,
    fontFamily: "SUITE_Medium",
    alignSelf: "center",
  },
  deleteBox: {
    backgroundColor: "#5C5C5C",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: "100%",
    marginLeft: 10,
  },
  deleteText: {
    color: "#fff",
    fontFamily: "SUITE",
  },
  addItem: {
    position: "absolute",
    alignItems: "flex-end",
    bottom: 295,
    right: 21,
    zIndex: 10,
  },
});

export default History;
