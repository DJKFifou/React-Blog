import { createContext, useState, useContext, useEffect } from 'react';

export const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const storedIsLogged = localStorage.getItem('isLogged');
    const storedUser = localStorage.getItem('user');

    if (storedIsLogged === 'true' && storedUser) {
        setIsLogged(true);
        setUser(JSON.parse(storedUser));
    }
}, []);

  function toggleIsLogged() {
    const state = !isLogged;
    setIsLogged(state);
    localStorage.setItem('isLogged', state);
    if (!state) {
        localStorage.removeItem('user');
        setUser(null);
    }
  };

  function toggleUser(userData) {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  useEffect(() => {
    console.log('user info : ', user);
}, [user]);

  return (
    <ThemeContext.Provider value={{ user, isLogged, toggleIsLogged, toggleUser }}>
      {children}
    </ThemeContext.Provider>
  );
}