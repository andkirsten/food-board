import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD4HJ4LFp2wNkNvCvW5rCW8-8iLyR0phBs",
  authDomain: "food-share-25d01.firebaseapp.com",
  projectId: "food-share-25d01",
  storageBucket: "food-share-25d01.appspot.com",
  messagingSenderId: "1077025488813",
  appId: "1:1077025488813:web:6cdf3951a0acd538d56b24",
  measurementId: "G-PSQ47FTQ1M",
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export default app;
