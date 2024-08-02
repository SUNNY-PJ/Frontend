import { Dimensions } from "react-native";

// 아이폰 6/7/8
// export const BASE_WIDTH = 375;

// 아이폰 13 (figma 기준)
export const BASE_WIDTH = 390;

// 현재 기기 화면 너비의 백분율을 계산 (주로 높이 조정에 사용)
export const wRatio = (size) => (Dimensions.get("window").width * size) / 100;

// 기준 너비에 상대적인 크기를 계산 (주로 너비 조정에 사용)
export const wScale = (size) =>
  Math.round((Dimensions.get("window").width / BASE_WIDTH) * size * 10) / 10;
