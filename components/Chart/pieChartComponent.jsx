import React from "react";
import { PieChart } from "react-native-chart-kit";
import { View } from "react-native";

const data = [
  {
    name: "의류",
    population: 2800000,
    color: "#007560",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "기타",
    population: 527612,
    color: "#6adca3",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "주거",
    population: 8538000,
    color: "#b9f4d6",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "식생활",
    population: 11920000,
    color: "#e9fbf2",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const PieChartComponent = () => {
  return (
    <View>
      <PieChart
        data={data}
        width={400}
        height={220}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[10, 10]}
        absolute
      />
    </View>
  );
};

export default PieChartComponent;
