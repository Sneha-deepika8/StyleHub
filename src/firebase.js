/**
 * Firebase Configuration
 * =======================
 * Firebase initialization with valid credentials.
 */

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from "firebase/auth";

// User's Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5N2sa3os1sJnnY1Kq-sf6gBeBZqmHYIs",
  authDomain: "stylehub-83e05.firebaseapp.com",
  projectId: "stylehub-83e05",
  storageBucket: "stylehub-83e05.firebasestorage.app",
  messagingSenderId: "412979545799",
  appId: "1:412979545799:web:87db9ef1e7d815ff4d20e2",
  measurementId: "G-953V9QP558"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Auth Providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export default app;
