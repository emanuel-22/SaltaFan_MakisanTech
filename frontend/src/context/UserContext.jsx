import React, { createContext, useState, useEffect, useRef } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState(null);
  const [id, setId] = useState(null);
  const [role, setRole] = useState(null); 
  const timeoutRef = useRef(null);

  const SESSION_TIMEOUT = 15 * 60 * 1000;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      logout();
    }, SESSION_TIMEOUT);
  };

  // Iniciar sesión
  const login = (token, name, id, role) => {
    try {
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("id", id);
      localStorage.setItem("role", role); 
      setToken(token);
      setName(name);
      setId(id);
      setRole(role); 
      setIsAuthenticated(true);
      resetTimeout();
    } catch (error) {
      console.error(
        "Error al guardar el token o los datos del usuario en localStorage",
        error
      );
    }
  };

  const logout = () => {
    setToken(null);
    setName(null);
    setId(null);
    setRole(null); 
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("role");  
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");
    const storedId = localStorage.getItem("id");
    const storedRole = localStorage.getItem("role"); 

    if (storedToken && storedName && storedId && storedRole) {
      setToken(storedToken);
      setName(storedName);
      setId(storedId);
      setRole(storedRole);
      setIsAuthenticated(true);
      resetTimeout();
    }

    const handleUserActivity = () => resetTimeout();

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ token, isAuthenticated, name, id, role, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
