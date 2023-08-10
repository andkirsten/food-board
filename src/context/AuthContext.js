import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  return React.useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [pending, setPending] = React.useState(true);

  let auth = getAuth();

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
