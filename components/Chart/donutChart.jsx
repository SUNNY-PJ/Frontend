import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { useIsFocused } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const baseWidth = 390;
const isIphone7 = windowWidth < baseWidth;

const DonutChart = ({
  data,
  noData,
  onCategorySelect,
  year,
  month,
  selectedCategory,
}) => {
  // const [selectedCategory, setSelectedCategory] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // setSelectedCategory(null);
      onCategorySelect(null);
    }
  }, [isFocused, year, month]);

  const handleCategorySelect = (category) => {
    // setSelectedCategory(category);
    onCategorySelect(category);
  };

  // 도넛 차트의 중심 좌표 및 반지름 설정
  const centerX = 110; // 중앙 X 좌표를 수정
  const centerY = 110; // 중앙 Y 좌표를 수정
  const radius = isIphone7 ? 80 : 100; // 반지름을 수정
  const strokeWidth = isIphone7 ? 90 : 110; // 선의 두께를 조정
  const textOffset = 20; // 텍스트의 수직 오프셋을 조정
  const textDistance = 15; // 텍스트의 수평 거리를 조정

  // 각도 계산
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  let startAngle = -90;
  let prevTextX = 0;

  const allZero = data.every((item) => item.value === 0);
  // value가 0보다 큰 항목만 필터링
  const adjustedData = data.filter((item) => item.value > 0);
  // 단일 항목이 전체를 차지하는지 확인
  const singleFullValueItem =
    adjustedData.length === 1 && adjustedData[0].value === 100;

  console.log("단일 항목", singleFullValueItem);

  const singleDataPath = `
      M ${centerX},${centerY}
      m -${radius}, 0
      a ${radius},${radius} 0 1,0 ${radius * 2},0
      a ${radius},${radius} 0 1,0 -${radius * 2},0
    `;

  //   <Circle
  //   cx={centerX}
  //   cy={centerY}
  //   r={radius}
  //   fill="#FFFBF6"
  //   stroke="black"
  //   strokeWidth="1.5"
  // />

  return (
    <View style={styles.container}>
      <Svg width="224" height="224">
        {data.flatMap((item, index) => {
          const valuePercentage = allZero ? 100 : (item.value / total) * 100;
          const endAngle = (valuePercentage / 100) * 360 + startAngle;
          const largeArcFlag = valuePercentage > 50 ? 1 : 0;

          if (isNaN(endAngle)) {
            console.error("Invalid end angle:", endAngle);
            return null;
          }

          const path = `
      M ${centerX},${centerY}
      L ${centerX + radius * Math.cos((Math.PI * startAngle) / 180)},
        ${centerY + radius * Math.sin((Math.PI * startAngle) / 180)}
      A ${radius},${radius} 0 ${largeArcFlag},1 
        ${centerX + radius * Math.cos((Math.PI * endAngle) / 180)},
        ${centerY + radius * Math.sin((Math.PI * endAngle) / 180)}
      Z
    `;

          // 텍스트 위치 계산
          const textAngle = (startAngle + endAngle) / 2; // 중간 각도
          let textX =
            centerX +
            (radius - strokeWidth / 2 + textOffset) *
              Math.cos((textAngle * Math.PI) / 180); // 텍스트의 X 좌표
          let textY =
            centerY +
            (radius - strokeWidth / 2 + textOffset) *
              Math.sin((textAngle * Math.PI) / 180); // 텍스트의 Y 좌표ㅁ

          // 이전 텍스트와 겹치지 않도록 조절
          if (textX - prevTextX < textDistance) {
            textX = prevTextX + textDistance;
          }

          // 아래쪽에 텍스트 배치를 위해 Y 좌표 조정
          textY += 15;

          prevTextX = textX;

          startAngle = endAngle;

          return [
            // <Path
            //   key={`${index}_path`}
            //   d={singleFullValueItem ? singleDataPath : path}
            //   fill={singleFullValueItem ? "#007560" : item.color}
            //   stroke="black"
            //   strokeWidth="1.5"
            //   onPress={() => onCategorySelect(item.category)}
            // />,
            <Path
              key={`${index}_path`}
              d={singleFullValueItem ? singleDataPath : path}
              fill={singleFullValueItem ? "#007560" : item.color}
              stroke="black"
              strokeWidth="1.5"
              onPress={() =>
                singleFullValueItem
                  ? onCategorySelect(adjustedData[0].category)
                  : onCategorySelect(item.category)
              }
            />,
            ,
          ];
        })}
        <Circle
          cx={centerX}
          cy={centerY}
          r={radius - strokeWidth / 2}
          fill="#FFFBF6"
          stroke="black"
          strokeWidth="1.5"
          onPress={() => onCategorySelect("center")}
        />
        {/* 중앙 텍스트 추가 */}
        {noData && (
          <Image
            source={require("../../assets/donutText.png")}
            x={centerX}
            y={centerY}
            style={{
              top: isIphone7 ? 95 : 90,
              right: isIphone7 ? -38 : -18,
              width: isIphone7 ? 144 : 184,
              height: isIphone7 ? 28 : 36,
            }}
          />
        )}
      </Svg>
      <View style={{ flexDirection: "row", gap: 24 }}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCategorySelect(item.category)}
            activeOpacity={0.8}
          >
            <View style={styles.section}>
              <View
                style={[
                  styles.imageContainer,
                  { backgroundColor: item.color },
                  selectedCategory === item.category && styles.selectedCategory,
                ]}
              >
                <Image source={item.url} style={styles.image} />
              </View>
              <Text style={[styles.text, { fontSize: isIphone7 ? 10 : 12 }]}>
                {item.title}
              </Text>
              {item.allZero ? (
                <Text style={[styles.text, { fontSize: isIphone7 ? 12 : 16 }]}>
                  %
                </Text>
              ) : (
                <Text style={[styles.text, { fontSize: isIphone7 ? 12 : 16 }]}>
                  {item.value}%
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: isIphone7 ? 30 : 36,
    height: isIphone7 ? 30 : 36,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 7,
    paddingBottom: 7,
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 50,
    borderWidth: 1.5,
  },
  image: {
    resizeMode: "contain",
    width: isIphone7 ? 16 : 20,
    height: isIphone7 ? 16 : 20,
  },
  text: {
    fontFamily: "SUITE_Bold",
    color: "#1F1F1F",
    fontSize: isIphone7 ? 10 : 12,
  },
  selectedCategory: {
    width: isIphone7 ? 35 : 40,
    height: isIphone7 ? 35 : 40,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  section: {
    gap: 3,
    marginTop: isIphone7 ? -18 : 10,
    alignItems: "center",
    width: isIphone7 ? 43 : 53,
  },
});

export default DonutChart;
