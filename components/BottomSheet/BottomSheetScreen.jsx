import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import BottomSheet from "./BottomSheet";

const BottomSheetScreen = ({
  modalVisible,
  modalDisable,
  onCategorySelect,
}) => {
  //   const [modalVisible, setModalVisible] = useState(false);
  //   const pressButton = () => {
  //     setModalVisible(true);
  //   };

  return (
    <View style={styles.rootContainer}>
      {/* <Button title={"Open BottomSheet!"} onPress={pressButton} /> */}
      <BottomSheet
        modalVisible={modalVisible}
        modalDisable={modalDisable}
        onCategorySelect={onCategorySelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomSheetScreen;
