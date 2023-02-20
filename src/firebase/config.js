import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfI7vHp89LorefDFrrz-ddhifgbY4NrO0",
  authDomain: "vueprojects-e3b33.firebaseapp.com",
  projectId: "vueprojects-e3b33",
  storageBucket: "vueprojects-e3b33.appspot.com",
  messagingSenderId: "180100350369",
  appId: "1:180100350369:web:7dd6c437b4a0ae6be14be0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const authorize = getAuth(app)
const timestamp = serverTimestamp

export {db,timestamp, authorize}