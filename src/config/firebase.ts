import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDcafIZEOgBZyPi5gujmBh5Js58qwOxNHk",
  authDomain: "helpsupport-fbe97.firebaseapp.com",
  projectId: "helpsupport-fbe97",
  storageBucket: "helpsupport-fbe97.firebasestorage.app",
  messagingSenderId: "904127300284",
  appId: "1:904127300284:web:fcf0658429a35f514586b9",
  measurementId: "G-PXZY4V59V4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;