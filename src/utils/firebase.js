import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBpj8LCy7ndMaXe-R2hBll3r3mVCkgkrIc",
  authDomain: "toquest-3f5d1.firebaseapp.com",
  projectId: "toquest-3f5d1",
  storageBucket: "toquest-3f5d1.appspot.com",
  messagingSenderId: "983973650119",
  appId: "1:983973650119:web:19bcf4c0a5d2fd46c728e2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
