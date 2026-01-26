// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMHflKtF2wiHRZn_B6_oyenl8jqnFlPzQ",
  authDomain: "primegame-5173.firebaseapp.com",
  projectId: "primegame-5173",
  storageBucket: "primegame-5173.firebasestorage.app",
  messagingSenderId: "840255008782",
  appId: "1:840255008782:web:16b889dfd1b00e6500cc5f",
  measurementId: "G-28GCSFRPJE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);