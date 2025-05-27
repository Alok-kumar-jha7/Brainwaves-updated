// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHzFB6Ugg_blJvkb4K-WOWkJONT31tqD8",
  authDomain: "brainwaves-app.firebaseapp.com",
  projectId: "brainwaves-app",
  storageBucket: "brainwaves-app.firebasestorage.app",
  messagingSenderId: "1070067047101",
  appId: "1:1070067047101:web:b962bfee5ddff8475735d4",
  measurementId: "G-EYEZ10WXYY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
 const analytics = getAnalytics(app);    

