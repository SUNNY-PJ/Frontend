import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

const DonutChart = ({ data, onCategorySelect }) => {
  // 도넛 차트의 중심 좌표 및 반지름 설정
  const centerX = 110; // 중앙 X 좌표를 수정
  const centerY = 110; // 중앙 Y 좌표를 수정
  const radius = 100; // 반지름을 수정
  const strokeWidth = 110; // 선의 두께를 조정
  const textOffset = 20; // 텍스트의 수직 오프셋을 조정
  const textDistance = 15; // 텍스트의 수평 거리를 조정

  // 각도 계산
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  let startAngle = -90;
  let prevTextX = 0;

  const allZero = data.every((item) => item.value === 0);
  console.log(allZero);
  // const adjustedData = allZero
  //   ? data.map((item) => ({ ...item, value: 100 / data.length }))
  //   : data;

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
            <Path
              key={`${index}_path`}
              d={path}
              fill={allZero ? "#FFFBF6" : item.color}
              stroke="black"
              strokeWidth="1.5"
              onPress={() => onCategorySelect(item.category)}
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
      </Svg>
      <View style={{ flexDirection: "row", gap: 24 }}>
        {data.map((item) => (
          <View
            style={{
              gap: 3,
              marginTop: 10,
              alignItems: "center",
              width: 50,
            }}
          >
            <View
              style={[styles.imageContainer, { backgroundColor: item.color }]}
            >
              <Image source={item.url} style={styles.image} />
            </View>
            <Text style={[styles.text, { fontSize: 12 }]}>{item.title}</Text>
            {item.allZero ? (
              <Text style={[styles.text, { fontSize: 16 }]}>%</Text>
            ) : (
              <Text style={[styles.text, { fontSize: 16 }]}>{item.value}%</Text>
            )}
          </View>
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
    width: 36,
    height: 36,
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
    width: 20,
    height: 20,
  },
  text: {
    fontFamily: "SUITE_Bold",
    color: "#1F1F1F",
  },
});

export default DonutChart;

// const donutData = [
//   {
//     value: 29,
//     color: "#007560",
//     url: require("../../assets/clothes_chart.png"),
//     title: "의류",
//     category: "CLOTHING",
//   },
//   {
//     value: 20,
//     color: "#6adca3",
//     url: require("../../assets/food_chart.png"),
//     title: "식생활",
//     category: "FOOD",
//   },
//   {
//     value: 12,
//     color: "#b9f4d6",
//     url: require("../../assets/home_chart.png"),
//     title: "주거",
//     category: "SHELTER",
//   },
//   {
//     value: 38,
//     color: "#e9fbf2",
//     url: require("../../assets/ect_chart.png"),
//     title: "기타",
//     category: "OTHERS",
//   },
// ];
