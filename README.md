# Gifter

An e-commerce web and mobile site to browse and buy gifts for loved ones for any occasion. Gifter is built with React, ___, Stripe and Firebase. 

[Live Gifter App](https://giftsbygifter.netlify.app/)

## Application Walkthrough 

## Tech Stack
- Front End: 
  - JavaScript & Typescript???
  - React (Hooks: useState, useEffect, useContext, useReducer)
  - Redux (including Redux Thunk & Redux Saga for asynchronous redux side effect handling)
  - Functional Programming Design Patterns: Currying, Memoisation (via Redux's Reselect library)
  - Sass (BEM)
- Back End:
  - Authentication: Firebase
  - Server & Storage: Firestore
  - Serverless Functions???
  - Payment Gatway: Stripe
- DevOps:
  - Testing Library (jest-dom, react, user-event)
  - Deployment: Netlify
  - CI/CD (Continuous Integration & Continuous Deployment) - Integrating Netlify into Github
  - Google Analytics??
  - Yarn

- Asynchronous Redux: (side effects handling)
  - Redux-Thunk
  - Redux-Saga
- TypeScript???
- Context API???
- Serverless Functions???
- GraphQL???
- Apollo???
- Stripe???
- PWA (Progressive Web App)???
- Gatsby.js

CHALLENGE: make this site have LIGHT MODE and DARK MODE?

## Features:
- Display of 5 gift categories (Birthday, Chirstmas, Thank you etc), 2-3 sub categories (For Her, For Them, Mr. & Mrs. etc..)
- Authentication by email and password, with Google or with GitHub(???)
- Add/Remove item(s) to/from basket with a real time item counter and price total calculator
- Pay with Stripe


## Milestones:
This project went though a few refactors and improvements as I learnt new libraries, frameworks and languages to incorporate. Using `git tag -a <version> -m "<version comments>"` to mark each of these in the code history ([see all tags](https://github.com/emilydaykin/Gifter/tags)), the state of Gifter at each milestone was as follows:

### v4
- PWA: progressive web app?
- GatsbyJS???
### v3
- typescript?
- redux store
- graphQL
- apollo
- security?
### v2
- Redux and Stripe integration?
- Redux (including Redux-Thunk and Redux-Saga)
- Serverless Functions + Stripe
### v1 [DONE!]
- Fully working and responsive app in web, tablet and mobile, powered by React, including useContexts and useReducer Hooks. 
- Styling done in pure Sass using the BEM methodology and without the help of any frameworks. 
- Users can browse and add to, edit and remove items from their cart, but can't yet pay.



## Code Snippets:
#### Generator Function & Redux Saga 

#### React Context: useContext hook and CartContext and UserContext in the Navbar &rarr; later refactored to Redux.
  ```
  // $src/components/Navbar.jsx

  import { useContext } from 'react';
  import { UserContext } from '../contexts/user.context';
  import { CartContext } from '../contexts/cart.context';
  
  const Navbar = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen, setIsCartOpen } = useContext(CartContext);
    const toggleShowHideCart = () => setIsCartOpen(!isCartOpen);
    const location = useLocation();

    const hideCartWhenNavigatingAway = () => {
      if (isCartOpen) {
        setIsCartOpen(!isCartOpen);
      }
    };
    ...
  }
  ```
  ```
  // $src/contexts/user.context.jsx

  export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
  });

  export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
      const unsubscribe = onAuthStateChangeListener((user) => {
        if (user) {
          createUserDocumentFromAuth(user);
        }
        setCurrentUser(user);
      });
      return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
  };
  ```
  ```
  // $src/contexts/cart.context.jsx
  
  export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    reduceItemQuantityInCart: () => {},
    getCartItemCount: () => {},
    getCartTotalPrice: () => {}
  });

  export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
      const matchingItemIndex = cartItems.findIndex((item) => item.id === productToAdd.id);

      if (matchingItemIndex === -1) {
        setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
      } else {
        const updatedCartItems = cartItems.map((item) => {
          return item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item;
        });
        setCartItems(updatedCartItems);
      }
    };

    const removeItemFromCart = (productToRemove) => {
      const updatedCartItems = cartItems.filter((item) => item.id !== productToRemove.id);
      setCartItems(updatedCartItems);
    };

    const reduceItemQuantityInCart = (productToReduce) => {
      const quantityOfItem = productToReduce.quantity;
      console.log('quantityOfItem', quantityOfItem);

      const reduceQuantity = cartItems.map((item) => {
        return item.id === productToReduce.id ? { ...item, quantity: item.quantity - 1 } : item;
      });

      const removeItem = cartItems.filter((item) => item.id !== productToReduce.id);

      setCartItems(quantityOfItem > 1 ? reduceQuantity : removeItem);
    };

    const getCartItemCount = () => {
      return cartItems.reduce((prev, curr) => prev + curr.quantity, 0);
    };

    const getCartTotalPrice = () => {
      const total = cartItems.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
      return total % 1 > 0 ? total.toFixed(2) : total; // currency rounding:
    };
    ...
  }
  ```
#### Redux Thunk for Categories
  ```
  import { CATEGORIES_ACTION_TYPES } from './category.types';
  import { getCategoriesAndDocuments } from '../../firebase/firebase.utils';

  export const fetchCategoriesStart = () => {
    return { type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START };
  };

  export const fetchCategoriesSuccess = (categories) => {
    return { type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, payload: categories };
  };

  export const fetchCategoriesFailure = (error) => {
    return { type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE, payload: error };
  };

  // Thunk:
  export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
      const categoryArray = await getCategoriesAndDocuments('categories');
      dispatch(fetchCategoriesSuccess(categoryArray));
    } catch (error) {
      console.log(`ERROR: ${error}`);
      dispatch(fetchCategoriesFailure(error));
    }
  };
  ```
- observer listener/design pattern



## Challenges, Wins & Key Learning

### Challenges:
- Biggest challenge: Redux Saga (a lot of boilerplate set up and config to learn)

### Wins
First time integrating a payment gateway
