import { createContext, useState, useEffect } from 'react';
import { onAuthStateChangeListener, createUserDocumentFromAuth } from '../firebase/firebase.utils';

// The context (the actual value we want to access)
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});

// The .provider = the actual component that will wrap around the component that needs the context
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    // this is a permanently open listener (so must unmount it to avoid memory leaks):
    const unsubscribe = onAuthStateChangeListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user); // if already exists, we simply get back userDocRef
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
