import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth, db } from "./firebase-config";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Fungsi untuk login menggunakan Google
export const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: user.displayName,
        role: "user",
      });
    }
    const updatedUserDoc = await getDoc(doc(db, "users", user.uid));
    return updatedUserDoc.data(); // Kembalikan data user
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error; // Melempar error agar dapat ditangani di luar fungsi
  }
};

// Fungsi untuk login menggunakan email dan password
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
      return userDoc.data();
    } else {
      return "user"; // Pengguna tidak ditemukan di Firestore
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error; // Melempar error agar dapat ditangani di luar fungsi
  }
};

// Fungsi untuk registrasi menggunakan email dan password
export const handleEmailRegister = async (email, password, username) => {
  try {
    // Membuat akun pengguna dengan email dan password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Simpan data pengguna ke Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      name: username,
      role: "user",
    });

    // Ambil data pengguna dari Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      return userDoc.data(); // Kembalikan data pengguna
    } else {
      throw new Error("User document not found after registration");
    }
  } catch (error) {
    console.error("Error registering:", error);
    throw error; // Melempar error agar dapat ditangani di luar fungsi
  }
};

// Fungsi untuk logout
export const handleLogout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error logging out:", error);
    throw error; // Melempar error agar dapat ditangani di luar fungsi
  }
};
