import { createContext, useState } from 'react';

// The context (the actual value we want to access)
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});

// The .provider = the actual component that will wrap around the component that needs the context
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
