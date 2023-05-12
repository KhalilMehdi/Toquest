import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CoinsDisplay from "@molecules/CoinsDisplay";

const RankingCard = ({ username, coins, rank }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.rank}>{rank}</Text>
      <Text style={styles.username}>{username}</Text>
      <CoinsDisplay coinsNumber={coins} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    elevation: 2,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
  },
  rank: {
    fontSize: 24,
    fontWeight: "bold",
  },
  username: {
    fontSize: 16,
  },
  coins: {
    fontSize: 16,
  },
});

export default RankingCard;
