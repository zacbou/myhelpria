import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  UserCredential,
  updateProfile
} from 'firebase/auth';
import { auth } from '../../config/firebase';

/**
 * Creates a new user account with email and password
 * Returns user object on success or error message on failure
 */
export const createUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

/**
 * Signs in a user with email and password
 * Supports "Remember me" functionality through persistence options
 */
export const signIn = async (email: string, password: string, rememberMe: boolean = false) => {
  try {
    // Set persistence based on rememberMe preference
    await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

/**
 * Signs out the current user
 */
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

/**
 * Sets up an authentication state observer
 * Callback is triggered whenever auth state changes
 */
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export const updateUserDisplayName = async (displayName: string): Promise<void> => {
  const user = auth.currentUser;
  if (!user) throw new Error('No authenticated user');
  
  await updateProfile(user, { displayName });
};