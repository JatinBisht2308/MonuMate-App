// Import the functions you need from the SDKs you need
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";

// getAuth
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9ISfZr1nM62_v9Hu4qxEk8GEvX223fZI",
  authDomain: "monumate-1189d.firebaseapp.com",
  projectId: "monumate-1189d",
  storageBucket: "monumate-1189d.appspot.com",
  messagingSenderId: "291908412691",
  appId: "1:291908412691:web:83e3c3cef47d84b886e6e6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { app, auth, db };
