import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  token: null,
  setAuthToken: () => {},
  setUserId: () => {},
  setUser: () => {},
  logout: () => {},
};

export const AuthContext = createContext(initialState);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) setAuthToken(JSON.parse(storedToken));
  }, []);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", JSON.stringify(authToken));
    } else {
      localStorage.removeItem("authToken");
    }
  }, [authToken]);

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
    navigate("/signin");
  };

  const contextValue = {
    token: authToken,
    setAuthToken,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
