import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  // Al iniciar, ver si hay una sesión guardada
  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = await AsyncStorage.getItem("currentUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuth(true);
      }
    };
    checkAuth();
  }, []);

  const register = async (newUser) => {
    
    try {
      const usersJSON = await AsyncStorage.getItem("users");
      const users = usersJSON ? JSON.parse(usersJSON) : [];

      // Verificar que no exista otro usuario con el mismo email
      const exists = users.find((u) => u.email === newUser.email);
      if (exists) {
        throw new Error("El email ya está registrado");
      }

      const updatedUsers = [...users, newUser];
      await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
      await AsyncStorage.setItem("currentUser", JSON.stringify(newUser));
      setUser(newUser);
      setIsAuth(true);
    } catch (error) {
      throw error;
    }
  };

  // Login con email y contraseña
  const login = async (email, password) => {
    try {
      const usersJSON = await AsyncStorage.getItem("users");      
      const users = usersJSON ? JSON.parse(usersJSON) : [];

      console.log("Usuarios registrados:", users);
      
      const found = users.find(
        (u) => u.email === email && u.password === password
      );      

      if (found) {
        await AsyncStorage.setItem("currentUser", JSON.stringify(found));
        setUser(found);
        setIsAuth(true);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error al hacer login", error);
      return false;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("currentUser");
    setUser(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        login,
        register,
        logout,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
