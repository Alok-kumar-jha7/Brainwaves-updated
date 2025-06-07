
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGjGzWM0e-ukqtFKw83VDtGua7L5EBfw0",
  authDomain: "brainwaves-updated.firebaseapp.com",
  projectId: "brainwaves-updated",
  storageBucket: "brainwaves-updated.firebasestorage.app",
  messagingSenderId: "902631665081",
  appId: "1:902631665081:web:6dac949955e57ab205da68",
  measurementId: "G-Q513J3PHTC"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth=initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
 const db = getFirestore(app);
//  const analytics = getAnalytics(app);    

export { auth,db};
