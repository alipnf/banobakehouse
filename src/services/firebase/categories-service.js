import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase-config";

// Nama koleksi dan dokumen
const ADMIN_COLLECTION = "admin";
const CATEGORIES_DOCUMENT = "categories";

/**
 * Fungsi untuk mendapatkan data kategori
 */
export const getCategories = async () => {
  const categoriesDocRef = doc(db, ADMIN_COLLECTION, CATEGORIES_DOCUMENT);
  const docSnap = await getDoc(categoriesDocRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    await setDoc(categoriesDocRef, { categories: [] });
    return { categories: [] };
  }
};

/**
 * Fungsi untuk menambahkan kategori baru
 */
export const addCategoryItem = async (newCategory) => {
  const categoriesDocRef = doc(db, ADMIN_COLLECTION, CATEGORIES_DOCUMENT);
  const docSnap = await getDoc(categoriesDocRef);

  if (docSnap.exists()) {
    const currentData = docSnap.data();
    const updatedCategories = [...(currentData.categories || []), newCategory];
    await updateDoc(categoriesDocRef, { categories: updatedCategories });
  } else {
    await setDoc(categoriesDocRef, { categories: [newCategory] });
  }
};

/**
 * Fungsi untuk memperbarui kategori berdasarkan ID
 */
export const updateCategoryItem = async (id, updatedData) => {
  const categoriesDocRef = doc(db, ADMIN_COLLECTION, CATEGORIES_DOCUMENT);
  const docSnap = await getDoc(categoriesDocRef);

  if (docSnap.exists()) {
    const currentData = docSnap.data();
    const updatedCategories = (currentData.categories || []).map((item) =>
      item.id === id ? { ...item, ...updatedData } : item,
    );
    await updateDoc(categoriesDocRef, { categories: updatedCategories });
  } else {
    console.log("No such document!");
  }
};

/**
 * Fungsi untuk menghapus kategori berdasarkan ID
 */
export const removeCategoryItem = async (id) => {
  const categoriesDocRef = doc(db, ADMIN_COLLECTION, CATEGORIES_DOCUMENT);
  const docSnap = await getDoc(categoriesDocRef);

  if (docSnap.exists()) {
    const currentData = docSnap.data();
    const updatedCategories = (currentData.categories || []).filter(
      (item) => item.id !== id,
    );
    await updateDoc(categoriesDocRef, { categories: updatedCategories });
  } else {
    console.log("No such document!");
  }
};

/**
 * Fungsi untuk mengunggah gambar ke Firebase Storage dan mendapatkan URL download
 */
export const uploadImageAndGetUrl = async (file) => {
  if (!file) return null;

  const storageRef = ref(storage, `category-images/${file.name}`);
  await uploadBytesResumable(storageRef, file);
  const downloadUrl = await getDownloadURL(storageRef);
  return downloadUrl;
};
