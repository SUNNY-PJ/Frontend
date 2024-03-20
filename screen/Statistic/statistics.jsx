import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useNavigation } from "@react-navigation/native";
import apiClient from "../../api/apiClient";
import Line from "../../components/Line";
import DonutChart from "../../components/Chart/donutChart";

const Statistics = ({ year, month }) => {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;

  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const categoryImages = {
    의류: require("../../assets/clothes_chart.png"),
    식생활: require("../../assets/food_chart.png"),
    주거: require("../../assets/home_chart.png"),
    기타: require("../../assets/ect_chart.png"),
  };

  // 전체 데이터
  const fetchData = async () => {
    const inputURL = "/consumption/spendTypeStatistics";
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        params: {
          year: year,
          month: month,
        },
      });
      // 응답 데이터를 기반으로 donutData 생성
      const updatedDonutData = createDonutData(response.data.data);
      setData(updatedDonutData);
      console.log(updatedDonutData);
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류:", error.response.data);
      } else {
        console.error("에러:", error);
      }
    }
  };

  const createDonutData = (data) => {
    const allValuesAreZero = data.every((item) => item.percentage === 0);

    // 색상 배열
    const colors = allValuesAreZero
      ? ["#FFFBF6"]
      : ["#007560", "#6adca3", "#b9f4d6", "#e9fbf2"];

    // 데이터를 percentage에 따라 내림차순 정렬
    const sortedData = data.sort((a, b) => b.percentage - a.percentage);

    // 정렬된 데이터에 색상과 필요한 정보 매핑
    return sortedData.map((item, index) => ({
      value: item.percentage,
      title: item.category,
      color: colors[index % colors.length],
      category: item.category,
      url:
        categoryImages[item.category.toUpperCase()] ||
        require("../../assets/ect_chart.png"), // 카테고리에 맞는 이미지 경로 할당
    }));
  };

  // 카테고리에 따라 API 호출
  const fetchCategoryData = async (categoryParam) => {
    const inputURL = "/consumption/category";
    try {
      const response = await apiClient.get(inputURL, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        params: {
          spendType: categoryParam,
          year: year,
          month: month,
        },
      });

      const CategoryDataValue = response.data.data;
      setCategoryData(CategoryDataValue);
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류:", error.response.data);
      } else {
        console.error("에러:", error);
      }
    }
  };

  useEffect(() => {
    setSelectedCategory(null);
    fetchData();
    fetchCategoryData();
  }, [year, month]);

  const translateY = new Animated.Value(0);

  useEffect(() => {
    let animation = Animated.loop(
      Animated.sequence([
        // 위로 10픽셀 이동
        Animated.timing(translateY, {
          toValue: -10,
          duration: 500,
          useNativeDriver: true,
        }),
        // 원래 위치로 이동
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    // 3번만 실행 (시간 계산...)
    setTimeout(() => {
      animation.stop();
    }, 3240);

    return () => {
      animation.stop();
    };
  }, [data]);

  const categoryParams = {
    의류: "CLOTHING",
    식생활: "FOOD",
    주거: "SHELTER",
    기타: "OTHERS",
  };

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    console.log("Selected category:", category);
    setSelectedCategory(category);
    const categoryParam = categoryParams[category];
    if (categoryParam) {
      fetchCategoryData(categoryParam);
    }
  };

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
      "지출",
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

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 24, marginBottom: 27 }}>
        <DonutChart data={data} onCategorySelect={handleCategoryClick} />
      </View>
      <Line h={4} color={"#C1C1C1"} />
      <View style={styles.bottomSection}>
        <ScrollView style={{ height: windowHeight - 500 - 250, flex: 1 }}>
          {Array.isArray(categoryData) &&
            categoryData.map((item, index) => (
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
      </View>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.addItem}
        onPress={() => navigation.navigate("Note")}
      >
        <Animated.Image
          source={require("../../assets/add.png")}
          style={{ width: 52, height: 52, transform: [{ translateY }] }}
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
  image: {
    width: 32,
    height: 32,
    alignSelf: "center",
    marginTop: 12,
  },
  text: {
    color: "#1F1F1F",
    fontSize: 20,
    alignSelf: "center",
    fontFamily: "SUIT_Bold",
  },
  contentSection: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 85,
    gap: 16,
    marginBottom: 20,
    marginTop: 12,
  },
  selectedCategory: {
    backgroundColor: "#FFEFDF",
  },
  bar: {
    width: "100%",
    height: 1.5,
    backgroundColor: "#1F1F1F",
  },
  section: {
    gap: 4,
    alignSelf: "center",
    width: 55,
  },
  bottomSection: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
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
  addItem: {
    position: "absolute",
    alignItems: "flex-end",
    bottom: 400,
    right: 21,
    zIndex: 10,
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

export default Statistics;
