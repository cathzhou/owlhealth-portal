import { auth } from "../firebase.config";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";



// Type definitions
export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // add user to Firestore
};

export const doSignOut = async () => {
  return auth.signOut();
};

export const doPasswordReset = async (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = async (password: string) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    return updatePassword(currentUser, password);
  } else {
    throw new Error("No user is currently signed in.");
  }
};

export const doSendEmailVerification = async () => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    return sendEmailVerification(currentUser, {
      url: `${window.location.origin}/login`,
    });
  } else {
    throw new Error("No user is currently signed in.");
  }
};
