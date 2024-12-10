import { 
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import type { Article } from '../../types';

const ARTICLES_COLLECTION = 'articles';

export const addArticle = async (articleData: Omit<Article, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, ARTICLES_COLLECTION), {
      ...articleData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
};

export const updateArticle = async (id: string, data: Partial<Article>) => {
  try {
    const docRef = doc(db, ARTICLES_COLLECTION, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString()
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteArticle = async (id: string) => {
  try {
    await deleteDoc(doc(db, ARTICLES_COLLECTION, id));
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getArticles = async () => {
  try {
    const q = query(
      collection(db, ARTICLES_COLLECTION),
      orderBy('updatedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const articles = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Article[];
    return { articles, error: null };
  } catch (error: any) {
    return { articles: [], error: error.message };
  }
};

export const getArticlesByCategory = async (category: string) => {
  try {
    const q = query(
      collection(db, ARTICLES_COLLECTION),
      where('category', '==', category),
      orderBy('updatedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const articles = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Article[];
    return { articles, error: null };
  } catch (error: any) {
    return { articles: [], error: error.message };
  }
};