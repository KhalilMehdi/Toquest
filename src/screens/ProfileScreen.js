import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Profile from "@organisms/Profile";

const QuestScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Profile />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default QuestScreen;
