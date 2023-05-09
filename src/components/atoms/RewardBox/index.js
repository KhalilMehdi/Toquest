import React from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "@atoms/CustomText";

const RewardBox = ({ points, coins, recompense }) => {
  const isUnlocked = coins >= points;
  const isReward = recompense !== null;

  let backgroundColor;
  if (isUnlocked && isReward) {
    backgroundColor = "green";
  } else if (isUnlocked) {
    backgroundColor = "red";
  } else {
    backgroundColor = "gray";
  }

  const styles = StyleSheet.create({
    container: {
      width: 296,
      height: 48,
      margin: 16,
      backgroundColor: backgroundColor,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: 20,
      color: "white",
    },
  });

  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>{points} points</CustomText>
    </View>
  );
};

export default RewardBox;
