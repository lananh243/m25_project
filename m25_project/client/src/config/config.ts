// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCb6k6dWDBObWmeG8Soty20lOYcfIQtotQ",
    authDomain: "m25-project-7bb66.firebaseapp.com",
    projectId: "m25-project-7bb66",
    storageBucket: "m25-project-7bb66.appspot.com",
    messagingSenderId: "213021704227",
    appId: "1:213021704227:web:94dea2134d8f9b024bf196",
    measurementId: "G-NZ7FVW40ZM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);