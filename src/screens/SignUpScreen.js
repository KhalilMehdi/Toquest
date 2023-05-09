import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import SignUp from "@organisms/SignUp";

const SignUpScreen = ({ setIsLoggedIn }) => {
  return (
    <SafeAreaView style={styles.container}>
      <SignUp setIsLoggedIn={setIsLoggedIn} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SignUpScreen;
