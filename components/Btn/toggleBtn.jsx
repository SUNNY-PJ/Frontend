import React, { useState } from "react";
import { View, Switch, StyleSheet } from "react-native";

const ToggleBtn = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <>
      <Switch
        trackColor={{ false: "#C1C1C1", true: "#FFA851" }}
        thumbColor={isEnabled ? "#fff" : "#fff"}
        ios_backgroundColor="#C1C1C1"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ToggleBtn;
