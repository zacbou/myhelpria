import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';
import { auth } from '../config/firebase';

export interface AuthError {
  code: string;
  message: string;
}

export const signUp = async (
  email: string,
  password: string
): Promise<UserCredential | AuthError> => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    return {
      code: error.code,
      message: error.message,
    };
  }
};

export const signIn = async (
  email: string,
  password: string
): Promise<UserCredential | AuthError> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    return {
      code: error.code,
      message: error.message,
    };
  }
};

export const logOut = async (): Promise<void> => {
  await signOut(auth);
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};