import React from "react";
import { View, StyleSheet } from "react-native";
import Reward from "@organisms/Reward";
import CoinsDisplay from "@molecules/CoinsDisplay";

const RewardScreen = () => {
  return (
    <View style={styles.container}>
      <Reward />
      <CoinsDisplay />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
});

export default RewardScreen;
