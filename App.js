import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./src/navigators/MainNavigator";
import AuthNavigator from "./src/navigators/AuthNavigator";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import CustomNavbar from "./src/components/molecules/CustomNavbar";
import AuthContext from "./src/context/authContext";

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

  const handleLogout = () => {
    try {
      setIsLoggedIn(false);
      setAppState("auth");
    } catch (error) {
      console.log("Logout error: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ handleLogin, handleLogout }}>
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
              <CustomNavbar
                selected={selectedTab}
                setSelected={setSelectedTab}
              />
            </>
          )}
        </SafeAreaView>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
