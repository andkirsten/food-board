import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../../Firebase";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [pending, setPending] = React.useState(true);

  let auth = getAuth();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setPending(false);
    });

    return unsubscribe; // Clean up the listener when the component unmounts
  }, [auth]);

  if (pending) {
    // You might want to render a loading indicator while the authentication state is being checked
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
