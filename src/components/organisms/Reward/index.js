import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { auth, db } from "@utils/firebase";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
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
    <ScrollView
      contentContainerStyle={styles.container}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});

export default Reward;
