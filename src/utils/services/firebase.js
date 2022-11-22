// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB728PvwaUs4xgl3WUs-pwzYCmUadJR3Gw",
  authDomain: "tweets-generator-a39af.firebaseapp.com",
  projectId: "tweets-generator-a39af",
  storageBucket: "tweets-generator-a39af.appspot.com",
  messagingSenderId: "831505723367",
  appId: "1:831505723367:web:e90dbb86644e76ea70d742",
  measurementId: "G-K57PDE1TC1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
