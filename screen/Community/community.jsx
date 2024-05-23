import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { styles } from "./community.styels";
import { useCommunity } from "../../context/communityContext";
import { useNavigation } from "@react-navigation/native";
import Board from "./board";
import Tip from "./tip";
import Line from "../../components/Line";
import BottomSheetScreen from "../../components/BottomSheet/BottomSheetScreen";
const windowWidth = Dimensions.get("window").width;
const baseWidth = 390;
const isIphone7 = windowWidth < baseWidth;

const COMMUNITY_SORT = [
  { title: "최신순", data: "LATEST" },
  { title: "조회순", data: "VIEW" },
];

const Community = () => {
  const navigation = useNavigation();
  const {
    board,
    tip,
    setBoard,
    setTip,
    setCategory,
    setTipSort,
    tipSort,
    setBoardSort,
    boardSort,
  } = useCommunity();
  const [open, setOpen] = useState(false);

  const boardClick = () => {
    setBoard(true);
    setTip(false);
    setCategory("FREE");
  };

  const tipClick = () => {
    setTip(true);
    setBoard(false);
    setCategory("TIP");
  };

  // 검색
  const handleSearch = () => {
    console.log("게시글을 검색합니다.");
    navigation.navigate("MainScreen", { screen: "Search" });
  };
  const handleSortClick = () => {
    setOpen(!open);
    console.log("정렬하시게씀까");
  };

  const handleCategorySelect = (data) => {
    // setSelectedSort(data);
    if (tip) {
      setTipSort(data);
    } else if (board) {
      setBoardSort(data);
    }
    console.log("여기가 팁이야", data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.box}>
          <TouchableOpacity onPress={tipClick} activeOpacity={0.6}>
            <Text style={[styles.tabText, tip && styles.activeTabText]}>
              절약 꿀팁
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={boardClick} activeOpacity={0.6}>
            <Text style={[styles.tabText, board && styles.activeTabText]}>
              자유 게시판
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabBar}>
          <View style={[styles.tabBarLine, tip && styles.activeTabBarLine]} />
          <View style={[styles.tabBarLine, board && styles.activeTabBarLine]} />
        </View>
        <View style={styles.section}>
          <TouchableOpacity activeOpacity={0.6} onPress={handleSortClick}>
            <View style={styles.setting}>
              <Image
                source={require("../../assets/sort.png")}
                style={styles.icon}
              />
              {tip ? (
                <Text style={styles.tipText}>
                  {tipSort === "LATEST" ? "최신순" : "조회순"}
                </Text>
              ) : (
                <Text style={styles.tipText}>
                  {boardSort === "LATEST" ? "최신순" : "조회순"}
                </Text>
              )}
            </View>
          </TouchableOpacity>
          <View style={styles.setting2}>
            <TouchableOpacity activeOpacity={0.6} onPress={handleSearch}>
              <Image
                source={require("../../assets/search.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                navigation.navigate("Post", {
                  screen: "Post",
                })
              }
            >
              <Image
                source={require("../../assets/write.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Line color={"#C1C1C1"} h={2} />
        {tip && <Tip />}
        {board && <Board />}
      </View>
      {open && (
        <BottomSheetScreen
          title={"정렬기준"}
          data={COMMUNITY_SORT}
          modalVisible={open}
          modalDisable={handleSortClick}
          onCategorySelect={handleCategorySelect}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: isIphone7 ? 13 : 15,
  },
  tabText: {
    fontSize: isIphone7 ? 18 : 20,
    fontFamily: "SUITE_Bold",
    color: "#C1C1C1",
    paddingTop: 9,
    paddingBottom: 6,
  },
});

export default Community;
