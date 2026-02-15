import { createContext, useEffect, useState } from "react";
import { auth } from "../api/firebase";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        try {
          const res = await api.get("/users/me");
          setUser({
            ...firebaseUser,
            role: res.data.data.user.role,
            name: res.data.data.user.name,
          });
        } catch (err) {
          console.error("Backend sync failed", err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
