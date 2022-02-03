// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAhtQVshVAwyaXM6Nj6K0HzlIrw_lxyW_4",
    authDomain: "carbide-pilot-303121.firebaseapp.com",
    projectId: "carbide-pilot-303121",
    storageBucket: "carbide-pilot-303121.appspot.com",
    messagingSenderId: "1057955968965",
    appId: "1:1057955968965:web:78ff7b252365c7207cfdac",
    measurementId: "G-CLR3MRGZ9R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default firebase;