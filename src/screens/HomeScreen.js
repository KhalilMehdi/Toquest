import React from "react";
import { View, StyleSheet } from "react-native";
import Home from "@organisms/Home";
import CoinsDisplay from "@molecules/CoinsDisplay";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Home />
      <CoinsDisplay userCoins />
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

export default HomeScreen;
