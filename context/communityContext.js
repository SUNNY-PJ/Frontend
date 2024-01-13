import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { proxyUrl } from "../constant/common";

const CommunityContext = createContext();

export const CommunityProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [board, setBoard] = useState(false);
  const [tip, setTip] = useState(true);
  const [category, setCategory] = useState("꿀팁");
  const [sort, setSort] = useState("최신순");
  const [tipSort, setTipSort] = useState("최신순");
  const [boardSort, setBoardSort] = useState("최신순");

  const inputURL = "/community";
  const url = proxyUrl + inputURL;

  const fetchData = async () => {
    const access_token = await AsyncStorage.getItem("access_token");

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          //   page: 1,
          //   size: 10,
          sort: sort,
          boardType: category,
        },
      });

      console.log("데이터:", response.data);
      setData(response.data.content);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
    if (category === "자유") {
      setSort(boardSort);
    } else if (category === "꿀팁") {
      setSort(tipSort);
    }
    console.log("게시판 정렬", sort);
  }, [category]);

  return (
    <CommunityContext.Provider
      value={{
        data,
        setData,
        board,
        setBoard,
        tip,
        setTip,
        fetchData,
        category,
        setCategory,
        boardSort,
        setBoardSort,
        tipSort,
        setTipSort,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error("useCommunity must be used within a CommunityProvider");
  }
  return context;
};
