import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {(screenProps) => (
          <LoginScreen {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />
        )}
      </Stack.Screen>
      <Stack.Screen name="SignUp">
        {(screenProps) => (
          <SignUpScreen {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
