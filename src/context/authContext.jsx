import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const logged = false;
      setIsAuth(logged);
    };

    checkAuth();
  }, []);

  //Modificar logica para que trate con usuarios reales en asyncStorage
  const login = () => {
    setIsAuth(true);
    //User default por el momento
    const loggedUser = {
      name: "Cosme Fulanito",
      email: "cosmefulanito@gmail.com",
      avatar: "",
    };
    setUser(loggedUser);
  };

  const logout = () => setIsAuth(false);

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
