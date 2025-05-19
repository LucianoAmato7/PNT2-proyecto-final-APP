import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(false) 

  useEffect(() => {
    const checkAuth = async () => {
        const logged = false
        setIsAuth(logged)
    };

    checkAuth();
  }, []);

  //Modificar logica para que trate con usuarios reales en asyncStorage
    const login = () => setIsAuth(true);
    const logout = () => setIsAuth(false);

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};