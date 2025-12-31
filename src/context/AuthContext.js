import {
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../services/firebase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // If we haven't manually set a bypass user, update state
      setUser(prev => (prev?.uid === 'bypass-123' ? prev : user));
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email, password) => {
    if (password === 'admin') {
      // Bypass authentication
      setUser({
        uid: 'bypass-123',
        email: email,
        displayName: 'Dev Admin',
        emailVerified: true,
        isAnonymous: false,
      });
      return;
    }
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    try {
      if (user?.uid === 'bypass-123') {
        setUser(null);
      } else {
        await firebaseSignOut(auth);
      }
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
