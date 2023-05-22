import React from "react";
import { View, StyleSheet } from "react-native";
import Home from "@organisms/Home";
import BackgroundImage from "@atoms/BackgroundImage";

const HomeScreen = () => {
  return (
    <BackgroundImage imageKey="forest">
      <View style={styles.container}>
        <Home />
      </View>
    </BackgroundImage>
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
