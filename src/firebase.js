// https://www.npmjs.com/package/react-dotenv
// REMEMBER: add new keys to package.json; refer to link above ^; You also need to re-launch the localhost ---> npm start

// Note: firebase.js needs to be in the src folder
import env from "react-dotenv";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: env.FIREBASE_KEY,
    authDomain: "netflix-clone-3e22a.firebaseapp.com",
    projectId: "netflix-clone-3e22a",
    storageBucket: "netflix-clone-3e22a.appspot.com",
    messagingSenderId: "1010534673854",
    appId: "1:1010534673854:web:d05e58e628098e0b22ddef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// explicit export; can have as many as you want
export {auth}

// default exports; can only have one
export default db