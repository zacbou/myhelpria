import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import type { ThemeConfig } from '../../types';

interface DomainSettings {
  domain: string;
  themeConfig: ThemeConfig;
}

export const updateDomainSettings = async (settings: DomainSettings) => {
  try {
    if (!auth.currentUser) {
      throw new Error('No authenticated user');
    }

    // Validate domain format
    if (settings.domain && !/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(settings.domain)) {
      throw new Error('Invalid domain format');
    }

    const settingsRef = doc(db, 'settings', auth.currentUser.uid);
    await setDoc(settingsRef, {
      ...settings,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getDomainSettings = async () => {
  try {
    if (!auth.currentUser) {
      throw new Error('No authenticated user');
    }

    const settingsRef = doc(db, 'settings', auth.currentUser.uid);
    const settingsSnap = await getDoc(settingsRef);

    if (settingsSnap.exists()) {
      return { settings: settingsSnap.data() as DomainSettings, error: null };
    }

    return { settings: null, error: null };
  } catch (error: any) {
    return { settings: null, error: error.message };
  }
};