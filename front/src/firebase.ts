import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCN28EyWeyIUaT6d9RHRmOKohqZJiyzFPw",
    authDomain: "powerup-blog.firebaseapp.com",
    projectId: "powerup-blog",
    storageBucket: "powerup-blog.appspot.com",
    messagingSenderId: "1062903502777",
    appId: "1:1062903502777:web:ccf6b93d8d1058a7764868",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
