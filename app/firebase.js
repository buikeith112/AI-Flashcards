// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC80Jgm8Pw3eEy0jpQmd_jaKPvgzxRY6Is",
  authDomain: "ai-flashcards-23b10.firebaseapp.com",
  projectId: "ai-flashcards-23b10",
  storageBucket: "ai-flashcards-23b10.appspot.com",
  messagingSenderId: "1007191650040",
  appId: "1:1007191650040:web:acbb66ace22aa216c4550d",
  measurementId: "G-RQZSQ95F74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };