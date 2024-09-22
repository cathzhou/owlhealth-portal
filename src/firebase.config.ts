// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtZFo9PKZpSgLvVYHwbxypPwXKz0rx84c",
  authDomain: "owl-health-portal.firebaseapp.com",
  databaseURL: "https://owl-health-portal-default-rtdb.firebaseio.com",
  projectId: "owl-health-portal",
  storageBucket: "owl-health-portal.appspot.com",
  messagingSenderId: "715831460086",
  appId: "1:715831460086:web:b17d82cca7a8e16dadacd7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const messagedatabase = getFirestore(app);
const storage = getStorage();

export { app, auth, database, messagedatabase, storage };

