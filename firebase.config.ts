// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDcQ9pbe_rqWpmkpWaPorVosbMGRHhUVo",
  authDomain: "lcl-hackathon-e10-sbox-d6db.firebaseapp.com",
  projectId: "lcl-hackathon-e10-sbox-d6db",
  storageBucket: "lcl-hackathon-e10-sbox-d6db.appspot.com",
  messagingSenderId: "832249341370",
  appId: "1:832249341370:web:7d91ed9f5fd886d89aa983",
  measurementId: "G-PXP040076G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };