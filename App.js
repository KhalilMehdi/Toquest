import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./src/navigators/MainNavigator";
import AuthNavigator from "./src/navigators/AuthNavigator";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import CustomNavbar from "./src/components/molecules/CustomNavbar";

const App = () => {
  const [selectedTab, setSelectedTab] = useState("Home");
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [appState, setAppState] = useState("onboarding");

  const handleOnboardingCompletion = () => {
    setOnboardingCompleted(true);
    setAppState("auth");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setAppState("main");
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        {appState === "onboarding" && (
          <OnboardingScreen
            setOnboardingCompleted={handleOnboardingCompletion}
          />
        )}
        {appState === "auth" && <AuthNavigator setIsLoggedIn={handleLogin} />}
        {appState === "main" && (
          <>
            <MainNavigator />
            <CustomNavbar selected={selectedTab} setSelected={setSelectedTab} />
          </>
        )}
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
