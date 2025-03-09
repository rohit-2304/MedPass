
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCe2jHCU_s6ZCd66IeQ9_aBOeBmMYAK4ZA",
  authDomain: "medpass-try.firebaseapp.com",
  databaseURL: "https://medpass-try-default-rtdb.firebaseio.com",
  projectId: "medpass-try",
  storageBucket: "medpass-try.firebasestorage.app",
  messagingSenderId: "769252918117",
  appId: "1:769252918117:web:5b9c79cb0a08124d6a978c",
  measurementId: "G-5Y1GZM5JT4",
  databaseURL:"https://medpass-try-default-rtdb.firebaseio.com",
};


export const app = initializeApp(firebaseConfig);
