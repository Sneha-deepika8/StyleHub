/**
 * AuthContext.jsx
 * ================
 * Authentication provider using Firebase.
 * Manages user state and provides login/signup/logout methods.
 */

import { createContext, useContext, useState, useEffect } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Signup with email/password
  function signup(email, password, username) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // You could update profile here with username
         return userCredential;
      });
  }

  // Login with email/password
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Login with Google
  function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  // Login with Facebook
  function loginWithFacebook() {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  }

  // Login with GitHub
  function loginWithGithub() {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  }

  // Logout
  function logout() {
    return signOut(auth);
  }

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Context value
  const value = {
    user: currentUser ? (currentUser.displayName || currentUser.email.split('@')[0]) : null, // Display name or part of email
    currentUser,
    isAuthenticated: !!currentUser,
    signup,
    login,
    logout,
    loginWithGoogle,
    loginWithFacebook,
    loginWithGithub
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
