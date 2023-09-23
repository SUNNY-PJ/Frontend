import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Bar = ({ text, path }) => {
  const [progress, setProgress] = useState(50);

  const progressWidth = (progress / 100) * 335;

  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: path }} style={styles.image} /> */}
      <Text style={styles.text}>{text}</Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: progressWidth,
              },
            ]}
          />
          <Text style={styles.progressText}>{`${progress}%`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginTop: 12,
    marginBottom: 12,
    alignItems: "center",
    paddingLeft: 28,
    paddingRight: 27,
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: "center",
  },
  text: {
    color: "#1F1F1F",
    fontSize: 20,
    fontWeight: "700",
    alignSelf: "center",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  progressBar: {
    position: "relative",
    width: "100%",
    // width: 335,
    height: 24,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "#1F1F1F",
    overflow: "hidden",
  },
  progressFill: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    backgroundColor: "#6ADCA3",
    borderRadius: 24,
    borderColor: "#1F1F1F",
    borderRightWidth: 1.5,
  },
  progressText: {
    // marginLeft: -20,
    left: 120,
    fontSize: 16,
    fontWeight: "900",
    color: "#1F1F1F",
  },
});

export default Bar;
