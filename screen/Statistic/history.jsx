import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  SafeAreaView,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import CalendarComponent from "../../components/Calendar/calendar";
import { useEffect } from "react";
import apiClient from "../../api/apiClient";

const History = () => {
  const windowHeight = Dimensions.get("window").height;

  const [data, setData] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  // 숫자에 세 자리마다 쉼표를 추가하는 함수
  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const onDataFetched = (data) => {
    setData(data);
  };

  useEffect(() => {
    onDataFetched;
  }, [data]);

  const renderRightActions = (consumptionId) => {
    return (
      <TouchableOpacity onPress={() => handleChatRoomDelete(consumptionId)}>
        <View style={styles.deleteBox}>
          <Text style={styles.deleteText}>삭제</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleChatRoomDelete = (consumptionId) => {
    Alert.alert(
      "",
      "지출 기록을 삭제하시겠습니까?\n다시 되돌릴 수 없습니다.",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: () => deleteData(consumptionId),
        },
      ],
      { cancelable: false }
    );
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
      if (consumptionDeleteData.status === 200) {
        fetchData();
        fetchCategoryData();
      }
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
              <Swipeable
                renderRightActions={() => renderRightActions(item.id)}
                key={item.id}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingTop: 10,
                    paddingBottom: 10,
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
            ))}
        </ScrollView>
      </SafeAreaView>
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
    marginTop: 24,
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: "center",
    marginTop: 12,
  },
  bottomSection: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
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
    fontWeight: 700,
    marginLeft: 16,
    alignSelf: "center",
  },
  bottomPriceText: {
    color: "#1F1F1F",
    fontSize: 16,
    fontWeight: 500,
    fontFamily: "SUITE_Medium",
    alignSelf: "center",
  },
  deleteBox: {
    backgroundColor: "#5C5C5C",
    justifyContent: "center",
    alignItems: "center",
    // width: "100%",
    width: 50,
    height: "100%",
    marginLeft: 10,
  },
  deleteText: {
    color: "#fff",
    fontFamily: "SUITE",
  },
});

export default History;
