import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { styles } from "./tip.styles";
import { useCommunity } from "../../context/communityContext";
import Line from "../../components/Line";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Tip = () => {
  const navigation = useNavigation();
  const { data, fetchData } = useCommunity();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(700).then(() => {
      console.log(refreshing);
      setRefreshing(false);
      fetchData();
    });
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchData();
      setLoading(false); // 데이터를 가져온 후 로딩 상태 업데이트
    };
    fetchInitialData();
  }, []);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {data && data.length > 0
            ? data.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() =>
                    navigation.navigate("Detail", {
                      screen: "Detail",
                      params: {
                        itemId: item.id,
                        userId: item.userId,
                      },
                    })
                  }
                  activeOpacity={0.6}
                >
                  <View style={styles.box}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.writer}>{item.writer}</Text>
                      <Text style={styles.description}>{item.createdAt}</Text>
                      <Text style={styles.description}>
                        조회 {item.viewCount}
                      </Text>
                      <Text style={styles.description}>
                        댓글 {item.commentCount}
                      </Text>
                    </View>
                  </View>
                  <Line color={"#C1C1C1"} h={2} />
                </TouchableOpacity>
              ))
            : null}
        </View>
      </View>
    </ScrollView>
  );
};

export default Tip;
