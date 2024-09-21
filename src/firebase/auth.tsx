import { auth } from "../firebase.config";

<<<<<<< HEAD
import { userEvent } from "@test-utils";
import { auth } from "./firebase";
=======
>>>>>>> 191e198bdc86207325b889af8f313e2a8caa55db
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

  if (user.email && !user.email.endsWith('@rice.edu')) {
    await auth.signOut(); // Sign the user out
    throw new Error("You must log in with a @rice.edu email.");
  }

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
