import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import QuestDisplay from "components/organisms/Quest/QuestDisplay";
import CompletedQuestDisplay from "components/organisms/Quest/CompletedQuestDisplay";
import CustomText from "@atoms/CustomText";

const QuestTab = () => {
  const [index, setIndex] = useState(0);
  const routes = [
    { key: "toDo", title: "Quetes a faire " },
    { key: "completed", title: "Quetes terminees" },
  ];

  const renderScene = SceneMap({
    toDo: QuestDisplay,
    completed: CompletedQuestDisplay,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.label}
      renderLabel={({ route }) => <CustomText>{route.title}</CustomText>}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: "100%" }}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff",
  },
  indicator: {
    backgroundColor: "#000",
  },
});

export default QuestTab;
