import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Ranking from "@organisms/Ranking";

const RankingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Ranking />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default RankingScreen;
