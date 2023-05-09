import React, { useEffect, useState, useRef } from "react";
import { auth, db } from "@utils/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { View, StyleSheet, PanResponder, Animated } from "react-native";
import CustomText from "@atoms/CustomText";

const CoinsDisplay = () => {
  const [coins, setCoins] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(db, "users", user.uid);

      const unsubscribe = onSnapshot(userDocRef, (userDocSnap) => {
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setCoins(userData.coins);
        } else {
          console.log("Aucun document trouvé !");
        }
      });

      return () => {
        unsubscribe();
      };
    } else {
      console.log("Utilisateur non connecté.");
    }
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <CustomText>Pièces : {coins}</CustomText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 2,
    padding: 10,
    elevation: 2,
    zIndex: 999,
  },
});

export default CoinsDisplay;
