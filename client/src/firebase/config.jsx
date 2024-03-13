// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCk6eMb-SyMQyJ89EAj38Ik0i6mWM_TB3E",
  authDomain: "note-app-sang.firebaseapp.com",
  projectId: "note-app-sang",
  storageBucket: "note-app-sang.appspot.com",
  messagingSenderId: "609131875950",
  appId: "1:609131875950:web:1147a488511ae7e03ce07f",
  measurementId: "G-D7MSNFFNQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);