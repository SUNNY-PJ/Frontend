import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

const DonutChart = ({ data, onCategorySelect }) => {
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

  const handleCategoryClick = () => {};

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
              onPress={() => onCategorySelect(item.category)}
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
          onPress={() => onCategorySelect("center")}
        />
      </Svg>
      <View style={{ flexDirection: "row", gap: 24 }}>
        {data.map((item) => (
          <View
            style={{
              gap: 3,
              marginTop: 10,
            }}
          >
            <View
              style={[styles.imageContainer, { backgroundColor: item.color }]}
            >
              <Image source={item.url} style={styles.image} />
            </View>
            <Text style={[styles.text, { fontSize: 12 }]}>{item.title}</Text>
            <Text style={[styles.text, { fontSize: 16 }]}>{item.value}%</Text>
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
    // backgroundColor: "#5C5C5C",
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
    alignSelf: "center",
  },
});

export default DonutChart;
