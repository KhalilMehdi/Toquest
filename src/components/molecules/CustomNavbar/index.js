import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomImage from "@atoms/CustomImage";

const CustomNavbar = ({ selected, setSelected }) => {
  const navigation = useNavigation();
  const tabs = [
    { title: "Quetes", screen: "Quest", iconName: "quest" },
    { title: "Recompenses", screen: "Reward", iconName: "chest" },
    { title: "Home", screen: "Home", iconName: "home" },
    { title: "Classement", screen: "Ranking", iconName: "ranking" },
    { title: "Profil", screen: "Profile", iconName: "profile" },
  ];

  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.title}
          onPress={() => {
            setSelected(tab.screen);
            navigation.navigate(tab.screen);
          }}
          style={[styles.tab, selected === tab.screen && styles.selectedTab]}
        >
          <CustomImage imageName={tab.iconName} style={styles.image} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 2,
    backgroundColor: "rgba(0, 0, 0, 0)",
    paddingBottom: 8,
    paddingTop: 10,
  },
  image: {
    width: 32,
    height: 32,
    margin: 4,
  },
  selectedTab: {
    borderBottomWidth: 4,
  },
});

export default CustomNavbar;
