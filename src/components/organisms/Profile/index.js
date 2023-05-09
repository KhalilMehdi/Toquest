import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Image } from "react-native";
import { auth, db, storage } from "@utils/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  updateEmail,
  sendPasswordResetEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import ImagePicker from "@molecules/CustomImagePicker";
import TextField from "@atoms/CustomTextInput";
import CustomButton from "@atoms/CustomButton";
import CustomText from "@atoms/CustomText";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setIsLoading(true);
    const userId = auth.currentUser.uid;
    const userSnapshot = await getDoc(doc(db, "users", userId));

    if (userSnapshot.exists()) {
      setUsername(userSnapshot.data().username);
      setEmail(userSnapshot.data().email);
      setProfileImage(userSnapshot.data().profileImage);
    }
    setIsLoading(false);
  };

  const uploadProfileImage = async (imageUri) => {
    setIsLoading(true);
    const user = auth.currentUser;
    const userId = user.uid;

    const fileExtension = imageUri.split(".").pop();
    const fileType = `image/${fileExtension}`;

    const storageRef = ref(storage, `profileImages/${userId}.${fileExtension}`);

    const metadata = {
      contentType: fileType,
    };

    const response = await fetch(imageUri);
    const blob = await response.blob();

    await uploadBytes(storageRef, blob, metadata);
    const profileImageUrl = await getDownloadURL(storageRef);

    await updateDoc(doc(db, "users", userId), {
      profileImage: profileImageUrl,
    });

    setProfileImage(profileImageUrl);
    setIsLoading(false);
  };

  const handleUpdateProfile = async () => {
    if (password === "") {
      Alert.alert("Erreur", "Veuillez entrer votre mot de passe actuel");
      return;
    }

    setIsLoading(true);
    const user = auth.currentUser;
    const userId = user.uid;
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
    await updateEmail(user, email);
    await updatePassword(user, password);

    await updateDoc(doc(db, "users", userId), {
      email: email,
      username: username,
    });

    Alert.alert("Succès", "Profil mis à jour avec succès !");
    setIsLoading(false);
  };

  const handleResetPassword = async () => {
    await sendPasswordResetEmail(auth, email);
    Alert.alert(
      "Réinitialisation du mot de passe",
      "Un e-mail de réinitialisation du mot de passe a été envoyé à votre adresse e-mail."
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={
          profileImage ? { uri: profileImage } : require("@images/forest.jpg")
        }
        style={styles.profileImage}
      />
      <ImagePicker onImagePicked={uploadProfileImage} />
      <TextField
        label="Pseudo"
        value={username}
        placeholder="Entrer votre pseudo"
        onChange={(text) => setUsername(text)}
      />
      <TextField
        label="Email"
        value={email}
        placeholder="Email"
        onChange={(text) => setEmail(text)}
      />
      <TextField
        label="Mot de passe actuel"
        value={password}
        placeholder="Mot de passe actuel"
        secureTextEntry
        onChange={(text) => setPassword(text)}
      />
      <CustomButton
        onPress={handleUpdateProfile}
        title="Appliquer"
        isLoading={isLoading}
      />
      <CustomText onPress={handleResetPassword}>
        Pour recevoir un mail de reinitialisation de mot de passe
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 2,
    alignSelf: "center",
    margin: 16,
  },
  usernameText: {
    alignSelf: "flex-start",
  },
  resetPasswordButton: {
    backgroundColor: "red",
  },
});

export default Profile;
