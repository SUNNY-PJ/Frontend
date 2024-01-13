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
          //   sort: "",
          //   sortType: "최신순",
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
  }, []);

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
