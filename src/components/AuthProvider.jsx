import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import { auth } from "./Firebase/Firebase";
import axiosPublic from "./AxiosPublic";

// Create A Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const storeToken = async (user) => {
    if (user?.email) {
      try {
        const { data } = await axiosPublic.post(`/create-token`, { email: user?.email });
  
       
  
        const token = data?.token;
        if (token) {
          localStorage.setItem('authToken', token);
        } else {
          console.log("Token not found in the API response");
        }
      } catch (error) {
        console.error("Failed to retrieve token:", error);
      }
    } else {
      console.log("No email found in user object");
    }
  };
  
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true); // Set loading true while processing

      if (user) {
        setCurrentUser(user);
        await storeToken(user); // Store token after user is authenticated
      } else {
        setCurrentUser(null);
        localStorage.removeItem('authToken');
      }

      setLoading(false); // Set loading false after processing is done
    });

    return () => unsubscribe();
  }, []);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, { displayName, photoURL });
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    signUp,
    login,
    googleLogin,
    logout,
    updateUser,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
