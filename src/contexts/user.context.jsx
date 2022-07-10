import { createContext, useEffect, useReducer } from 'react';
import { onAuthStateChangeListener, createUserDocumentFromAuth } from '../firebase/firebase.utils';

// The context (the actual value we want to access)
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});

const INITIAL_STATE = {
  currentUser: null
};

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
};

const userReducer = (state, action) => {
  // console.log('dispatched (user)!');
  // console.log('action (user):', action);
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state, // always load the previous state first!
        currentUser: payload
      };
    default:
      throw new Error(`Unknown type '${type}' in the userReducer`);
  }
};

// The .provider = the actual component that will wrap around the component that needs the context
export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const { currentUser } = state;
  // console.log('currentUser', currentUser);

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };

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
