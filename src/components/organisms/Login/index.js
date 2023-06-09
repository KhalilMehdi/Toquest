import React, { useState } from "react";
import { Alert, View, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import CustomTextInput from "@atoms/CustomTextInput";
import CustomText from "@atoms/CustomText";
import CustomButton from "@atoms/CustomButton";

export default function LoginScreen({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (email === "") {
      Alert.alert(
        "Erreur",
        "Veuillez entrer un nom d'utilisateur ou une adresse email"
      );
      return;
    }

    if (password === "") {
      Alert.alert("Erreur", "Veuillez entrer un mot de passe");
      return;
    }

    console.log("Tentative de connexion...");

    let userEmail = email;
    if (!email.includes("@")) {
      userEmail = await getEmailFromUsername(email);
      if (!userEmail) {
        Alert.alert("Erreur", "Nom d'utilisateur introuvable");
        console.log("Nom d'utilisateur introuvable");
        return;
      }
    }

    signInWithEmailAndPassword(auth, userEmail, password)
      .then((userCredential) => {
        console.log("Connexion réussie");
        setIsLoggedIn(true);
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Erreur", "Échec de la connexion: " + errorMessage);
        console.log("Échec de la connexion :", errorMessage);
      });
  };

  const getEmailFromUsername = async (username) => {
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const user = querySnapshot.docs[0].data();
      return user.email;
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Connexion</CustomText>
      <CustomTextInput
        label="Nom d'utilisateur ou Email"
        value={email}
        placeholder="Entrez votre nom d'utilisateur ou Email"
        onChangeText={(text) => setEmail(text)}
      />
      <CustomTextInput
        label="Mot de passe"
        value={password}
        placeholder="Entrez votre mot de passe"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.actionContainer}>
        <CustomButton onPress={() => handleSignIn()} title="connexion" />
        <CustomText navigateTo="SignUp" style={styles.linkText}>
          Creer un compte
        </CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
  },
  actionContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    fontSize: 16,
    color: "#5DC8D0",
    marginTop: 16,
  },
});
