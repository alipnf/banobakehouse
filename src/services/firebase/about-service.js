// src/services/about-service.js
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";

// Nama koleksi dan dokumen
const ADMIN_COLLECTION = "admin";
const WEB_INFO_DOCUMENT = "webInfo";

// Fungsi untuk mendapatkan data dari dokumen webInfo
export const getWebInfo = async () => {
  const webInfoDocRef = doc(db, ADMIN_COLLECTION, WEB_INFO_DOCUMENT);
  const docSnap = await getDoc(webInfoDocRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

// Fungsi untuk menyimpan atau memperbarui data di dokumen webInfo
export const saveWebInfo = async (data) => {
  const webInfoDocRef = doc(db, ADMIN_COLLECTION, WEB_INFO_DOCUMENT);
  await setDoc(webInfoDocRef, data, { merge: true });
};

// Fungsi untuk menambahkan media sosial baru
export const addSocialMedia = async (newSocialMedia) => {
  const webInfoDocRef = doc(db, ADMIN_COLLECTION, WEB_INFO_DOCUMENT);
  const docSnap = await getDoc(webInfoDocRef);

  if (docSnap.exists()) {
    const currentData = docSnap.data();
    const updatedSocialMedia = [
      ...(currentData.socialMedia || []), // Pastikan socialMedia ada atau default ke array kosong
      newSocialMedia,
    ];
    await updateDoc(webInfoDocRef, { socialMedia: updatedSocialMedia });
  } else {
    console.log("No such document!");
  }
};

// Fungsi untuk menghapus media sosial
export const removeSocialMedia = async (id) => {
  const webInfoDocRef = doc(db, ADMIN_COLLECTION, WEB_INFO_DOCUMENT);
  const docSnap = await getDoc(webInfoDocRef);

  if (docSnap.exists()) {
    const currentData = docSnap.data();
    const updatedSocialMedia = (currentData.socialMedia || []).filter(
      (item) => item.id !== id,
    );
    await updateDoc(webInfoDocRef, { socialMedia: updatedSocialMedia });
  } else {
    console.log("No such document!");
  }
};
