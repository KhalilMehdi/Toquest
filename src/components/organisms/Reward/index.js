import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { auth, db } from "@utils/firebase";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import RewardBox from "@atoms/RewardBox";

const Reward = () => {
  const [userPoints, setUserPoints] = useState(0);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(db, "users", user.uid);

      onSnapshot(userDocRef, (userDocSnap) => {
        if (userDocSnap.exists()) {
          setUserPoints(userDocSnap.data().coins);
        } else {
          console.log("No such document!");
        }
      });
    } else {
      console.log("User not logged in.");
    }
  }, []);

  useEffect(() => {
    getDocs(collection(db, "rewards")).then((querySnapshot) => {
      const rewardsData = querySnapshot.docs.map((doc) => doc.data());
      setRewards(rewardsData);
    });
  }, []);

  return (
    <ScrollView>
      {rewards.map((reward, index) => (
        <RewardBox
          key={index}
          userPoints={userPoints}
          points={reward.points}
          gift={reward.gift}
        />
      ))}
    </ScrollView>
  );
};

export default Reward;
