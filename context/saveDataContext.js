import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../api/apiClient";

// Context 생성
const SaveDataContext = createContext();

// Provider 컴포넌트
export const SaveDataProvider = ({ children }) => {
  const [saveData, setSaveData] = useState({
    isLoaded: false,
    day: 0,
    progress: 0,
    cost: 0,
  });

  // 데이터 패치 함수
  const fetchData = async () => {
    try {
      const response = await apiClient.get("/save", {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      if (response.status === 200) {
        console.log("절약 목표", response.data);
        const SaveDataVal = response.data.data;
        // date가 음수가 아닌 항목만 필터링
        const validSaveData = SaveDataVal.filter((item) => item.date >= 0);
        if (validSaveData.length > 0) {
          const SaveData = validSaveData[0];
          console.log("절약 목표 조회::", SaveData);
          setSaveData({
            isLoaded: true,
            day: SaveData.date,
            progress: SaveData.savePercentage,
            cost: SaveData.cost,
          });
        } else {
          console.log("절약 목표 조회 없는 경우::", SaveDataVal);
          // 절약 목표가 없는 경우
          setSaveData({
            isLoaded: false,
            day: 0,
            progress: 0,
            cost: 0,
          });
        }
      } else if (response.status === 404) {
        setSaveData({
          isLoaded: false,
          day: 0,
          progress: 0,
          cost: 0,
        });
      }
    } catch (error) {
      console.error("에러:", error);
      setSaveData({
        isLoaded: false,
        day: 0,
        progress: 0,
        cost: 0,
      });
    }
  };

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  return (
    <SaveDataContext.Provider value={{ saveData, setSaveData, fetchData }}>
      {children}
    </SaveDataContext.Provider>
  );
};

// Custom Hook
export const useSaveData = () => useContext(SaveDataContext);
