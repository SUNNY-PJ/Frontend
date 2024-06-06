import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { styles } from "./statistics.styles";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useNavigation } from "@react-navigation/native";
import apiClient from "../../api/apiClient";
import Line from "../../components/Line";
import DonutChart from "../../components/Chart/donutChart";

const windowWidth = Dimensions.get("window").width;
const baseWidth = 390;
const isIphone7 = windowWidth < baseWidth;

const Statistics = ({ year, month }) => {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;

  const [data, setData] = useState([]);
  const [noData, setNoData] = useState(false);
  const [categoryParamVal, setCategoryParamVal] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
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
        console.error("서버 응답 오류: statistics", error.response.data);
      } else {
        console.error("에러:", error);
      }
    }
  };

  const createDonutData = (data) => {
    const allValuesAreZero = data.every((item) => item.percentage === 0);
    const noDataColor = ["#5C5C5C", "#C1C1C1", "#E8E9E8", "#F1F1F1"];
    const Color = ["#007560", "#6adca3", "#b9f4d6", "#e9fbf2"];
    setNoData(allValuesAreZero);
    // 색상 배열
    const colors = allValuesAreZero ? noDataColor : Color;

    // 데이터를 percentage에 따라 내림차순 정렬
    const sortedData = data.sort((a, b) => b.percentage - a.percentage);

    // 정렬된 데이터에 색상과 필요한 정보 매핑
    return sortedData.map((item, index) => ({
      allZero: allValuesAreZero,
      value: allValuesAreZero ? 25 : item.percentage,
      title: item.category,
      color: colors[index % colors.length],
      category: item.category,
      url:
        categoryImages[item.category.toUpperCase()] ||
        require("../../assets/ect_chart.png"),
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
        console.error(
          "서버 응답 오류: category statistic",
          error.response.data
        );
      } else {
        console.error("에러:", error);
      }
    }
  };

  useEffect(() => {
    setSelectedCategory(null);
    fetchData();
    fetchCategoryData();
  }, [year, month, noData]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchData();
      fetchCategoryData();
    }
  }, [isFocused]);

  const translateY = new Animated.Value(0);

  useEffect(() => {
    let animation = Animated.loop(
      Animated.sequence([
        // 위로 10픽셀 이동
        Animated.timing(translateY, {
          toValue: -20,
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
    setCategoryParamVal(categoryParam);
    if (categoryParam) {
      fetchCategoryData(categoryParam);
    }
  };

  const renderRightActions = (consumptionId) => {
    return (
      <TouchableOpacity
        onPress={() => handleChatRoomDelete(consumptionId)}
        activeOpacity={0.6}
      >
        <View style={[styles.deleteBox]}>
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
      fetchData();
      fetchCategoryData(categoryParamVal);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const handleModify = (consumptionId) => {
    navigation.navigate("Note", {
      screen: "Note",
      params: {
        consumptionId: consumptionId,
        screen: "statistics",
      },
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: isIphone7 ? -10 : 24,
          marginBottom: isIphone7 ? 15 : 30,
        }}
      >
        <DonutChart
          data={data}
          noData={noData}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategoryClick}
          year={year}
          month={month}
        />
      </View>
      <Line h={4} color={"#C1C1C1"} />
      <SafeAreaView style={styles.bottomSection}>
        <ScrollView style={{ height: windowHeight - 698, flex: 1 }}>
          {Array.isArray(categoryData) &&
            categoryData.map((item, index) => (
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
            marginBottom: 15,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Statistics;
