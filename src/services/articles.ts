import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  DocumentData,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Article } from '../types';

const COLLECTION_NAME = 'articles';

export const createArticle = async (article: Omit<Article, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...article,
    views: 0,
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
};

export const updateArticle = async (id: string, article: Partial<Article>): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    ...article,
    lastUpdated: new Date().toISOString(),
  });
};

export const deleteArticle = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};

export const getArticles = async (): Promise<Article[]> => {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy('lastUpdated', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  } as Article));
};

export const getArticlesByCategory = async (category: string): Promise<Article[]> => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('category', '==', category),
    orderBy('lastUpdated', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  } as Article));
};

export const incrementArticleViews = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    views: increment(1),
  });
};