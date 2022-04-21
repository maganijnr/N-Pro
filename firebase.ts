// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
   apiKey: "AIzaSyC_F_993PE05FEljwjRRT5YjwRAv2mYC70",
   authDomain: "n-pro-21803.firebaseapp.com",
   projectId: "n-pro-21803",
   storageBucket: "n-pro-21803.appspot.com",
   messagingSenderId: "157207119088",
   appId: "1:157207119088:web:e7c0e22691d52fe5452e35"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const auth = getAuth();

export default app
export {auth, db}