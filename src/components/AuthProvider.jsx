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
          const token = await firebaseUser.getIdToken();

          const res = await api.get("/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });

          setUser({
            ...firebaseUser,
            role: res.data?.data?.user?.role,
            name: res.data?.data?.user?.name,
          });
        } catch (err) {
          console.error("Backend sync failed", err.response?.data?.message);

          if (err.response?.status === 401 && err.response?.data?.message === "No token provided") {
            setUser(null);
          } else {
            setUser(firebaseUser);
          }
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
