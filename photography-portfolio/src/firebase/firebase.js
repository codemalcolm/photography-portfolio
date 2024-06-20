// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCd5uhMKiWB9N5i8A8PhLNw1WrIU_Ifz9w",
  authDomain: "jirimachacek-photography.firebaseapp.com",
  projectId: "jirimachacek-photography",
  storageBucket: "jirimachacek-photography.appspot.com",
  messagingSenderId: "972079210687",
  appId: "1:972079210687:web:448c748430308af4e9e60a",
  measurementId: "G-ZW1NBLYEKY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app)
const firestore = getFirestore(app)

export {app, firestore, storage};