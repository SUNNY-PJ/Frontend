import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

const DonutChart = () => {
  // 데이터 설정 (값과 색상)
  const data = [
    {
      value: 30,
      color: "#007560",
      url: require("../../assets/clothes_chart.png"),
    },
    {
      value: 20,
      color: "#6adca3",
      url: require("../../assets/food_chart.png"),
    },
    {
      value: 12,
      color: "#b9f4d6",
      url: require("../../assets/home_chart.png"),
    },
    { value: 38, color: "#e9fbf2", url: require("../../assets/ect_chart.png") },
  ];

  // 도넛 차트의 중심 좌표 및 반지름 설정
  const centerX = 110; // 중앙 X 좌표를 수정합니다.
  const centerY = 110; // 중앙 Y 좌표를 수정합니다.
  const radius = 100; // 반지름을 수정합니다.
  const strokeWidth = 110; // 선의 두께를 조정합니다.
  const textOffset = 20; // 텍스트의 수직 오프셋을 조정합니다.
  const textDistance = 15; // 텍스트의 수평 거리를 조정합니다.

  // 각도 계산
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  let startAngle = -90;
  let prevTextX = 0;

  const handlePress = (item) => {
    console.log("Clicked data:", item);
  };

  return (
    <View style={styles.container}>
      <Svg width="224" height="224">
        {data.flatMap((item, index) => {
          const endAngle = (item.value / total) * 360 + startAngle;
          const largeArcFlag = item.value / total > 0.5 ? 1 : 0;
          const path = `
            M ${centerX},${centerY}
            L ${centerX + radius * Math.cos((startAngle * Math.PI) / 180)},${
            centerY + radius * Math.sin((startAngle * Math.PI) / 180)
          }
            A ${radius},${radius} 0 ${largeArcFlag},1 ${
            centerX + radius * Math.cos((endAngle * Math.PI) / 180)
          },${centerY + radius * Math.sin((endAngle * Math.PI) / 180)}
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
              Math.sin((textAngle * Math.PI) / 180); // 텍스트의 Y 좌표

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
              fill={item.color}
              stroke="black"
              strokeWidth="1.5"
              onPress={() => handlePress(item)}
            />,
            ,
          ];
        })}
        <Circle
          cx={centerX}
          cy={centerY}
          r={radius - strokeWidth / 2}
          fill="white"
          stroke="black"
          strokeWidth="1.5"
          onPress={() => handlePress({ value: "center" })}
        />
      </Svg>
      <View style={{ flexDirection: "row", gap: 20 }}>
        {data.map((item) => (
          <View style={{ gap: 3, marginTop: 10 }}>
            <Image source={item.url} style={styles.image} />
            <Text
              style={{
                fontFamily: "SUITE_Bold",
                fontSize: 16,
                color: "#1F1F1F",
              }}
            >
              {item.value}%
            </Text>
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
  image: {
    width: 32,
    height: 32,
  },
});

export default DonutChart;
