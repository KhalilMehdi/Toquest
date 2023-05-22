import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { auth, db } from "@utils/firebase";
import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
  addDoc,
  getDoc,
} from "firebase/firestore";
import RewardCard from "@atoms/RewardCard";
import CustomText from "@atoms/CustomText";

const Reward = () => {
  const [userPoints, setUserPoints] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    const claimsQuery = query(
      collection(db, "claims"),
      where("userId", "==", user.uid)
    );

    const userDocRef = doc(db, "users", user.uid);
    const rewardsRef = collection(db, "rewards");

    const unsubscribes = [
      onSnapshot(claimsQuery, async (snapshot) => {
        const claimsWithUsernames = [];
        for (const claimDoc of snapshot.docs) {
          const claim = claimDoc.data();
          claim.username = await getUserName(claim.userId); // Fetch the user name
          claimsWithUsernames.push(claim);
        }
        setClaims(claimsWithUsernames);
      }),
      onSnapshot(userDocRef, (userDocSnap) => {
        if (userDocSnap.exists()) {
          setUserPoints(userDocSnap.data().coins);
        } else {
          console.log("No such document!");
        }
      }),
      onSnapshot(rewardsRef, (querySnapshot) => {
        let rewardsData = querySnapshot.docs.map((doc) => doc.data());
        rewardsData.sort((a, b) => b.points - a.points);
        setRewards(rewardsData);
      }),
    ];

    return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
  }, []);

  const handleClaimReward = async (gift, points, claim) => {
    try {
      if (!claim && userPoints >= points) {
        await addDoc(collection(db, "claims"), {
          userId: auth.currentUser.uid,
          gift,
          username: auth.currentUser.displayName,
          given: false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUserName = async (docId) => {
    try {
      const userSnapshot = await getDoc(doc(db, "users", docId));
      if (userSnapshot.exists()) {
        return userSnapshot.data().username;
      } else {
        console.warn(`User data not found for document ID: ${docId}`);
        return "";
      }
    } catch (error) {
      console.error(
        `Error fetching user data for document ID: ${docId}`,
        error
      );
      return "";
    }
  };

  return (
    <View>
      <View style={styles.titleContainer}>
        <CustomText style={styles.title}>RECOMPENSE</CustomText>
      </View>
      <ScrollView>
        {rewards.map((reward, index) => {
          const claim = claims.find((claim) => claim.gift === reward.gift);
          const isUnlocked = userPoints >= reward.points;
          const progress = Math.min((userPoints / reward.points) * 100, 100);
          const missingPoints = reward.points - userPoints;

          return (
            <RewardCard
              key={index}
              isUnlocked={isUnlocked}
              missingPoints={missingPoints}
              gift={reward.gift}
              points={reward.points}
              progress={progress}
              handleClaimReward={() =>
                handleClaimReward(reward.gift, reward.points, claim)
              }
              isClaimed={!!claim}
              rewardGiven={claim?.given}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Reward;

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
  },
  title: {
    fontSize: 32,
  },
});
