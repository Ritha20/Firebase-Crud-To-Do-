// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbXf-ltp0DSD1QZagkqf0_UCkONi3_jSM",
  authDomain: "to-do-6eaad.firebaseapp.com",
  projectId: "to-do-6eaad",
  storageBucket: "to-do-6eaad.firebasestorage.app",
  messagingSenderId: "506335425345",
  appId: "1:506335425345:web:09670a4f5d66027e25e7c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
