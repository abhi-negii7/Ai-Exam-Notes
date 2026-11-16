// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authnoteai.firebaseapp.com",
  projectId: "authnoteai",
  storageBucket: "authnoteai.firebasestorage.app",
  messagingSenderId: "215248786528",
  appId: "1:215248786528:web:975290c98562d4da855f05",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
