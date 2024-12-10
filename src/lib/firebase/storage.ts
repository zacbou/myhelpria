// Firebase Storage utility functions for handling file uploads
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db } from '../../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const storage = getStorage();

/**
 * Uploads a file to Firebase Storage and returns the download URL
 * @param file - The file to upload
 * @param path - The storage path (e.g., 'profiles' or 'companies')
 */
export const uploadFile = async (file: File, path: string) => {
  try {
    if (!auth.currentUser) {
      throw new Error('No authenticated user');
    }

    const fileRef = ref(storage, `${path}/${auth.currentUser.uid}_${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return { url: downloadURL, error: null };
  } catch (error: any) {
    return { url: null, error: error.message };
  }
};

/**
 * Updates user profile with new photo URL
 */
export const updateProfilePhoto = async (photoURL: string) => {
  try {
    if (!auth.currentUser) {
      throw new Error('No authenticated user');
    }

    await auth.currentUser.updateProfile({ photoURL });
    
    // Update user document in Firestore
    const userRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userRef, { photoURL });
    
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

/**
 * Updates company logo URL in Firestore
 */
export const updateCompanyLogo = async (logoURL: string) => {
  try {
    if (!auth.currentUser) {
      throw new Error('No authenticated user');
    }

    const companyRef = doc(db, 'companies', auth.currentUser.uid);
    await updateDoc(companyRef, { logoURL });
    
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};