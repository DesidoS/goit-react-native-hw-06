import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import "firebase/storage";
import "firebase/firestore";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwGyCZsTklt1cj36h4rkm5b0dNWWmqC-s",
  authDomain: "react-native-hw-40c0f.firebaseapp.com",
  projectId: "react-native-hw-40c0f",
  storageBucket: "react-native-hw-40c0f.appspot.com",
  messagingSenderId: "54430716923",
  appId: "1:54430716923:web:b747262fd0887bb2dc715e",
  measurementId: "G-N017805RGE",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const fbStore = getFirestore(app);
