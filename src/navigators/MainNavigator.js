import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import QuestScreen from "../screens/QuestScreen";
import RankingScreen from "../screens/RankingScreen";
import RewardScreen from "../screens/RewardScreen";

const Stack = createNativeStackNavigator();

const MainNavigator = ({ handleLogout }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Profile"
        children={(props) => (
          <ProfileScreen {...props} handleLogout={handleLogout} />
        )}
      />
      <Stack.Screen name="Quest" component={QuestScreen} />
      <Stack.Screen name="Reward" component={RewardScreen} />
      <Stack.Screen name="Ranking" component={RankingScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
