import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "gerald-hu.firebaseapp.com",
  projectId: "gerald-hu",
  storageBucket: "gerald-hu.appspot.com",
  messagingSenderId: "78084335849",
  appId: "1:78084335849:web:6036937ea8113a2dea6878",
  measurementId: "G-1LLBXKF3GG"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
