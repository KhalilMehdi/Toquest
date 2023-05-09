import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomIcon from "@atoms/CustomIcon";
import CustomText from "@atoms/CustomText";

const CustomNavbar = ({ selected, setSelected }) => {
  const navigation = useNavigation();
  const tabs = [
    { title: "Quêtes", screen: "Quest", iconName: "parchment" },
    { title: "Récompenses", screen: "Reward", iconName: "chest" },
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
          <CustomIcon
            iconName={tab.iconName}
            width={40}
            height={30}
            color="black"
          />
          <CustomText style={styles.tabText}></CustomText>
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

  selectedTab: {
    borderBottomWidth: 4,
    borderBottomColor: "",
  },
});

export default CustomNavbar;
