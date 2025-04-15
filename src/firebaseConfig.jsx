import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhLP8zyxZ7LgFXvyTYiBjsfpNqlETSf2Y",
  authDomain: "sushant-571a1.firebaseapp.com",
  projectId: "sushant-571a1",
  storageBucket: "sushant-571a1.firebasestorage.app",
  messagingSenderId: "948999835849",
  appId: "1:948999835849:web:23930661ac8c30269efd18",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

// ✅ Export for use across app
export { auth, googleProvider, db };
