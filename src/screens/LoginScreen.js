import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Login from "@organisms/Login";

const LoginScreen = ({ setIsLoggedIn }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Login setIsLoggedIn={setIsLoggedIn} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default LoginScreen;
