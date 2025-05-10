// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3ONiJhBzCHsp1qGrhdqCI5JCLVRDHr0Q",
  authDomain: "pet-adopt-app-f1a50.firebaseapp.com",
  projectId: "pet-adopt-app-f1a50",
  storageBucket: "pet-adopt-app-f1a50.firebasestorage.app",
  messagingSenderId: "377528938919",
  appId: "1:377528938919:web:f0d447c3c3e85831b54682",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
