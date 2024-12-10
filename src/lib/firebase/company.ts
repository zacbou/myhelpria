import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

interface CompanyProfile {
  name: string;
  logo: string;
  industry: string;
  website: string;
  address: string;
  createdBy: string;
  updatedAt: string;
}

export const updateCompanyProfile = async (profile: Omit<CompanyProfile, 'createdBy' | 'updatedAt'>) => {
  try {
    if (!auth.currentUser) {
      throw new Error('No authenticated user');
    }

    const companyRef = doc(db, 'companies', auth.currentUser.uid);
    
    await setDoc(companyRef, {
      ...profile,
      createdBy: auth.currentUser.uid,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getCompanyProfile = async () => {
  try {
    if (!auth.currentUser) {
      throw new Error('No authenticated user');
    }

    const companyRef = doc(db, 'companies', auth.currentUser.uid);
    const companySnap = await getDoc(companyRef);

    if (companySnap.exists()) {
      return { profile: companySnap.data() as CompanyProfile, error: null };
    }

    return { profile: null, error: null };
  } catch (error: any) {
    return { profile: null, error: error.message };
  }
};