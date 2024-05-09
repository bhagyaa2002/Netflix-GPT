// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7dyaZG4rEVS0pDi3FE8WkHLIhnitOnzQ",
  authDomain: "netflixgpt-aaa1b.firebaseapp.com",
  projectId: "netflixgpt-aaa1b",
  storageBucket: "netflixgpt-aaa1b.appspot.com",
  messagingSenderId: "980006213402",
  appId: "1:980006213402:web:072004ebeb9133fe73bea3",
  measurementId: "G-F42H5KJY9D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
