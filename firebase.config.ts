import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig: { [key: string]: string } = {
  apiKey: "AIzaSyBDcQ9pbe_rqWpmkpWaPorVosbMGRHhUVo",
  authDomain: "lcl-hackathon-e10-sbox-d6db.firebaseapp.com",
  projectId: "lcl-hackathon-e10-sbox-d6db",
  storageBucket: "lcl-hackathon-e10-sbox-d6db.appspot.com",
  messagingSenderId: "832249341370",
  appId: "1:832249341370:web:7d91ed9f5fd886d89aa983",
  measurementId: "G-PXP040076G"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(app);
