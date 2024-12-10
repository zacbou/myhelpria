import { 
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import type { Page } from '../../types';

const PAGES_COLLECTION = 'pages';

export const getPages = async () => {
  try {
    const q = query(
      collection(db, PAGES_COLLECTION),
      orderBy('lastUpdated', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const pages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Page[];
    return { pages, error: null };
  } catch (error: any) {
    return { pages: [], error: error.message };
  }
};

export const createPage = async (pageData: Omit<Page, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, PAGES_COLLECTION), {
      ...pageData,
      createdAt: new Date().toISOString()
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
};

export const updatePage = async (id: string, data: Partial<Page>) => {
  try {
    const docRef = doc(db, PAGES_COLLECTION, id);
    await updateDoc(docRef, {
      ...data,
      lastUpdated: new Date().toISOString()
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deletePage = async (id: string) => {
  try {
    await deleteDoc(doc(db, PAGES_COLLECTION, id));
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};