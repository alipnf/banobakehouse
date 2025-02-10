import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth, db } from "./firebase-config";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user",
      });
    }

    const updatedUserDoc = await getDoc(doc(db, "users", user.uid));
    return updatedUserDoc.data().role; // Kembalikan role user
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

export const handleEmailLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      return userDoc.data().role;
    } else {
      return "user";
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

export const handleEmailRegister = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      email,
      role: "user",
    });

    alert("Register success");
  } catch (error) {
    console.error("Error registering:", error);
  }
};

export const handleLogout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
