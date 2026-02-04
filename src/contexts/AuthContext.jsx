
import React, { useContext, useState, useEffect } from 'react';
// Import the functions we need from the Firebase Auth SDK
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../services/firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    // Use the v9 syntax: function(auth, email, password)
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    // Use the v9 syntax: function(auth, email, password)
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    // Use the v9 syntax: function(auth)
    return signOut(auth);
  }

  useEffect(() => {
    // onAuthStateChanged is a function that takes auth and a callback
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  // Render a loading indicator while checking for user auth state.
  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
