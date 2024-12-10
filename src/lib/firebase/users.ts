import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

interface UserProfile {
  displayName: string;
  email: string;
  phone: string;
  timeZone: string;
  companyName: string;
  companyLogo: string;
  industry: string;
  website: string;
  address: string;
}

export const updateUserProfile = async (profile: UserProfile) => {
  try {
    if (!auth.currentUser) {
      throw new Error('No authenticated user');
    }

    const userRef = doc(db, 'users', auth.currentUser.uid);
    
    // Use setDoc with merge option to create or update the document
    await setDoc(userRef, {
      ...profile,
      updatedAt: new Date().toISOString()
    }, {
      merge: true // This ensures we don't overwrite the entire document
    });

    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};