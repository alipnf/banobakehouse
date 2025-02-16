import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";

// Nama koleksi dan dokumen
const ADMIN_COLLECTION = "admin";
const FAQ_DOCUMENT = "faq";

// Fungsi untuk mendapatkan data FAQ dari dokumen faq
export const getFAQ = async () => {
  const faqDocRef = doc(db, ADMIN_COLLECTION, FAQ_DOCUMENT);
  const docSnap = await getDoc(faqDocRef);

  if (docSnap.exists()) {
    // Dokumen ditemukan, kembalikan data
    return docSnap.data();
  } else {
    console.log("Dokumen tidak ditemukan, membuat dokumen baru...");
    // Buat dokumen baru dengan data default
    await setDoc(faqDocRef, { faqs: [] });
    // Kembalikan data default
    return { faqs: [] };
  }
};

// Fungsi untuk menyimpan atau memperbarui data di dokumen faq
export const saveFAQ = async (data) => {
  const faqDocRef = doc(db, ADMIN_COLLECTION, FAQ_DOCUMENT);
  await setDoc(faqDocRef, data, { merge: true });
};

// Fungsi untuk menambahkan pertanyaan baru ke FAQ
export const addFAQItem = async (newFAQ) => {
  const faqDocRef = doc(db, ADMIN_COLLECTION, FAQ_DOCUMENT);
  const docSnap = await getDoc(faqDocRef);

  if (docSnap.exists()) {
    const currentData = docSnap.data();
    const updatedFAQs = [
      ...(currentData.faqs || []), // Pastikan faqs ada atau default ke array kosong
      newFAQ,
    ];
    await updateDoc(faqDocRef, { faqs: updatedFAQs });
  } else {
    console.log("No such document!");
  }
};

// Fungsi untuk menghapus pertanyaan dari FAQ berdasarkan ID
export const removeFAQItem = async (id) => {
  const faqDocRef = doc(db, ADMIN_COLLECTION, FAQ_DOCUMENT);
  const docSnap = await getDoc(faqDocRef);

  if (docSnap.exists()) {
    const currentData = docSnap.data();
    const updatedFAQs = (currentData.faqs || []).filter(
      (item) => item.id !== id,
    );
    await updateDoc(faqDocRef, { faqs: updatedFAQs });
  } else {
    console.log("No such document!");
  }
};
