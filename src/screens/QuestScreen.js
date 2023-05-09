import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import QuestTab from "@organisms/Quest/QuestTab";

const QuestScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <QuestTab />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default QuestScreen;
