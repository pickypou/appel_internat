// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9nOpB1AquzAK2LpCeXq10MGUTaSi0HKE",
  authDomain: "appel-internat.firebaseapp.com",
  projectId: "appel-internat",
  storageBucket: "appel-internat.firebasestorage.app",
  messagingSenderId: "799921934880",
  appId: "1:799921934880:web:8fc73b3849e29408a82245"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Exports
export const db = getFirestore(app); // Firestore
export const auth = getAuth(app);     // Auth