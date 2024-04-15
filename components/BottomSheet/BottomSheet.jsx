import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  TouchableOpacity,
  Image,
} from "react-native";

const BottomSheet = ({
  modalVisible,
  modalDisable,
  onCategorySelect,
  title,
  data,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const screenHeight = Dimensions.get("screen").height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (modalVisible) {
      resetBottomSheet.start();
    }
  }, [modalVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      modalDisable(false);
    });
  };

  const handleCategoryClick = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    console.log("카테고리 클릭:", selectedCategory);

    // 선택된 카테고리를 부모 컴포넌트로 전달
    onCategorySelect(selectedCategory);
    modalDisable();
  };

  return (
    <Modal
      visible={modalVisible}
      animationType={"fade"}
      transparent
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            ...styles.bottomSheetContainer,
            transform: [{ translateY: translateY }],
          }}
          {...panResponders.panHandlers}
        >
          <View style={styles.header}>
            <Text
              style={{
                ...styles.title,
                flex: 1,
                textAlign: "center",
                left: 24,
              }}
            >
              {title}
            </Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              {/* <Text style={styles.closeButtonText}>X</Text> */}
              <Image
                source={require("../../assets/close.png")}
                style={{
                  width: 16,
                  height: 16,
                }}
              />
            </TouchableOpacity>
          </View>
          {data &&
            data.length > 0 &&
            data.map((item, index) => (
              <TouchableOpacity
                onPress={() => handleCategoryClick(item.data)}
                key={index}
                style={styles.item}
              >
                <Text style={styles.text}>{item.title}</Text>
                {/* {index < data.length - 1 && <View style={styles.divider} />} */}
              </TouchableOpacity>
            ))}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 30,
  },
  title: {
    fontSize: 20,
    color: "#1F1F1F",
    fontFamily: "SUITE",
  },
  text: {
    fontSize: 15,
    color: "#1F1F1F",
    fontFamily: "SUITE_Bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    width: "100%",
  },
  closeButton: {
    padding: 16, // 충분한 터치 영역을 제공합니다.
  },
  closeButtonText: {
    fontSize: 16,
    fontFamily: "SUITE_Bold",
  },
  item: {
    width: "100%", // 항목들이 전체 너비를 차지하도록 설정합니다.
    paddingVertical: 12, // 터치 영역을 높입니다.
    paddingHorizontal: 16, // 여백을 추가합니다.
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    width: "100%", // 구분선이 전체 너비를 차지하도록 설정합니다.
    marginTop: 12,
  },
});

export default BottomSheet;
