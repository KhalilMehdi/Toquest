import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { auth, db } from "@utils/firebase";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import CoinsDisplay from "@molecules/CoinsDisplay";
import RewardBox from "@atoms/RewardBox";

const Reward = () => {
  const [coins, setCoins] = useState(0);
  const [rewardsData, setRewardsData] = useState([]);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(db, "users", user.uid);

      const unsubscribe = onSnapshot(userDocRef, (userDocSnap) => {
        if (userDocSnap.exists()) {
          setCoins(userDocSnap.data().coins);
        } else {
          console.log("No such document!");
        }
      });

      return unsubscribe;
    } else {
      console.log("User not logged in.");
    }
  }, []);

  useEffect(() => {
    const fetchRewardsData = async () => {
      const rewardsCol = collection(db, "rewards");
      const rewardsSnapshot = await getDocs(rewardsCol);
      setRewardsData(rewardsSnapshot.docs.map((doc) => doc.data()));
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: false });
      }
    };

    fetchRewardsData();
  }, []);

  const maxPoints = Math.max(...rewardsData.map((reward) => reward.points));
  const rewards = Array.from(
    { length: Math.floor(maxPoints / 100) },
    (_, i) => {
      const points = maxPoints - i * 100;
      const rewardData = rewardsData.find((r) => r.points === points);
      return rewardData || { points, recompense: null };
    }
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onLayout={() => {
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: false });
          }
        }}
      >
        {rewards.map((reward, index) => (
          <RewardBox
            key={index}
            points={reward.points}
            coins={coins}
            recompense={reward.recompense}
          />
        ))}
      </ScrollView>
      <View style={styles.coinsDisplayContainer}>
        <CoinsDisplay userCoins style={styles.coinsDisplay} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  coinsDisplayContainer: {
    position: "absolute",
    top: 100,
    right: -30,
    zIndex: 1,
  },
});

export default Reward;
