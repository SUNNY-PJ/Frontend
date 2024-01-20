import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import Bar from "../../components/Bar";
import axios from "axios";
import { proxyUrl } from "../../constant/common";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Statistics = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const inputURL = "/consumption/spendTypeStatistics";
    const url = proxyUrl + inputURL;
    const access_token = await AsyncStorage.getItem("access_token");

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log("데이터:", response.data.data);
      setData(response.data.data);
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

  const imageData = [
    {
      category: "식생활",
      image: require("../../assets/food.png"),
    },
    {
      category: "주거",
      image: require("../../assets/home.png"),
    },
    {
      category: "기타",
      image: require("../../assets/etc.png"),
    },
    {
      category: "의류",
      image: require("../../assets/shirt.png"),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {data.map((item, index) => (
          <View key={index}>
            <View style={styles.contentSection}>
              <View style={styles.section}>
                <Image
                  source={
                    imageData.find(
                      (imageItem) => imageItem.category === item.category
                    )?.image || require("../../assets/shirt.png")
                  }
                  style={styles.image}
                />
                <Text style={styles.text}>{item.category}</Text>
              </View>
              <Bar text={item.totalMoney} progress={item.percentage} />
            </View>
            <View style={styles.bar} />
          </View>
        ))}
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.bottomBar} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text style={styles.bottomText}>컨버스 운동화</Text>
          <Text style={styles.bottomPriceText}>89,000원</Text>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.bottomBar} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text style={styles.bottomText}>미스치프 카고 바지</Text>
          <Text style={styles.bottomPriceText}>139,000원</Text>
        </View>
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
  contentContainer: {
    // marginBottom: 40,
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
    fontWeight: "700",
    alignSelf: "center",
  },
  contentSection: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 85,
    gap: 16,
    marginBottom: 24,
    marginTop: 12,
  },
  bar: {
    width: "100%",
    height: 1.5,
    backgroundColor: "#1F1F1F",
  },
  section: {
    gap: 4,
    alignSelf: "center",
    width: 52,
    // justifyContent: "center",
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
    fontWeight: 700,
    marginLeft: 16,
    alignSelf: "center",
  },
  bottomPriceText: {
    color: "#1F1F1F",
    fontSize: 16,
    fontWeight: 500,
    alignSelf: "center",
  },
  // addIcon: {
  //   width: 52,
  //   height: 52,
  //   transform: [{ translateY }],
  // },
  addItem: {
    // position: "absolute",
    // right: 20,
    alignItems: "flex-end",
    bottom: 10,
    right: 21,
  },
});

export default Statistics;
