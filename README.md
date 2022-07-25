# Gifter

A full-stack, tested??? & responsive e-commerce web and mobile site to browse and buy gifts for any occasion. Gifter is built with JavaScript, TypeScript, React, Redux, Sass, Stripe and Firebase.

[Live Gifter App](https://giftsbygifter.netlify.app/)

## Application Walkthrough 

## Tech Stack
- Front End: 
  - JavaScript & Typescript
  - React (Hooks: useState, useEffect, useContext, useReducer, useCallback)
  - Redux (including Redux Thunk & Redux Saga for asynchronous redux side effect handling)
  - Functional Programming Design Patterns: Currying, Memoisation (via Redux's Reselect library)
  - Sass (BEM)
- Back End:
  - Authentication: Firebase
  - Server & Storage: Firestore
  - Serverless Functions
  - Payment Gateway: Stripe
- DevOps:
  - Deployment: Netlify
  - Testing 
    - Testing Library (jest-dom, react, user-event)
    - Jest
    - Enzyme
    - Unit / Int / Automation (end-to-end)
  - CI/CD (Continuous Integration & Continuous Deployment) - Integrating Netlify into Github
  - Google Analytics??
  - Yarn

I also created a [spin-off version of Gifter](https://github.com/emilydaykin/graphql) that leverages GraphQL and Apollo.

- Context API???
- PWA (Progressive Web App)???
- Gatsby.js

CHALLENGE: make this site have LIGHT MODE and DARK MODE?

## Features:
- Display of 5 gift categories (Birthday, Chirstmas, Thank you, Anniversary and Wedding)
- Authentication by email and password, or with Google
- Add/Remove item(s) to/from basket with a real time item counter and price total calculator
- Pay with Stripe
- Fully responsive for any device size


## Milestones:
This project went though a few refactors and improvements as I learnt new libraries, frameworks and languages to incorporate. Using `git tag -a <version> -m "<version comments>"` to mark each of these in the code history ([see all tags](https://github.com/emilydaykin/Gifter/tags)), the state of Gifter at each milestone was as follows:

### v5 [NOT DONE YET!]
- PWA: progressive web app?
- Testing (Jest/Enzyme/Snapshot Testing)???
- GatsbyJS???
### v4
- Performance optimisations (useCallback and React memo for function and function output memoisations respectively, and code splitting (the bundle.js) with dynamic imports via React Lazy & React Suspense)
- Tightening Firebase (Firestore) security rules to read-only for all documents and categories, and allowing write access for users if the id matches the request's.
### v3
- Codebase converted from JavaScript to TypeScript, including React Components, the entire Redux Store (and Sagas), and utility files (for firebase and reducer)
### v2 
- Redux (Redux Saga & Generator functions) and Stripe integration
- Serverless Function that creates a payment intent for Stripe. It is hosted on Netlify and uses AWS' Lambda function under the hood. This will help automate any necessary scaling.
- Currying & Memoisation Design Patterns (via Redux's Reselect library)
- Session Storage via Redux Persist to retain data between refreshes/sessions.
- UX: Users can now pay for their selected gifts using a test credit card number, which will be handled by Stripe.
### v1
- Fully working and responsive app in web, tablet and mobile, powered by JavaScript and React, including useContext and useReducer Hooks. 
- Styling done in pure Sass (without the help of any frameworks) using the BEM methodology.
- Server, Storage and Authentication handled by Firebase (& Firestore).
- UX: Users can browse gifts across 5 categories, sign in (with email or via Google) and sign out, as well as add to, edit and remove items from their cart; they can also check out, but can't yet pay.


## Code Snippets:

<details>
  <summary>Click to expand!</summary>
  
  ```javascript
  
  ```
</details>


- observer listener/design pattern
### Improving Firebase (Firestore) Security Rules
<details>
  <summary>View rule</summary>
  
  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read;
      }
      
      match /users/{userId} {
        allow read, get, create;
        allow write: if request.auth != null && request.auth.id == userId;
      }
      
      match /categories/{category} {
        allow read;
      }
    }
  }
  ```
</details>

### Dynamic Imports via React Lazy and React Suspense for performance optimisation
<details>
  <summary>View Code</summary>
  
  ```javascript
  // $src/App.js

  const Home = lazy(() => import('./components/Home'));
  const Navbar = lazy(() => import('./components/Navbar'));
  const About = lazy(() => import('./components/About'));
  const Shop = lazy(() => import('./components/Shop'));
  const SignIn = lazy(() => import('./components/auth/SignIn'));
  const Checkout = lazy(() => import('./components/checkout/Checkout'));

  const App = () => {
    ...

    return (
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path='shop/*' element={<Shop />} />
            <Route path='about' element={<About />} />
            <Route path='auth' element={<SignIn />} />
            <Route path='checkout' element={<Checkout />} />
          </Route>
        </Routes>
      </Suspense>
    );
  };
  ```
</details>

### UseCallback hook to optimise performance by memoising functions
<details>
  <summary>View Code (Go To Checkout callback)</summary>
  
  ```javascript
  const goToCheckout = useCallback(() => {
    if (cartItems.length > 0) {
      navigate('/checkout');
      dispatch(setIsCartOpen(!isCartOpen));
    }
  }, [isCartOpen]);
  ```
</details>

<details>
  <summary>View Code (Redirecting to Target Category callback)</summary>
  
  ```javascript
  const redirectToCategory = useCallback((category: string) => {
    navigate(`/shop/${category}`);
  }, []);
  ```
</details>


### TypeScript

### Generator Functions & Redux Saga for Categories
<details>
  <summary>View Code (Root Saga)</summary>
  
  ```javascript
  import { all, call } from 'redux-saga/effects';
  import { categoriesSaga } from './categories/category.saga';
  import { userSaga } from './user/user.saga';

  // generator function
  export function* rootSaga() {
    yield all([call(categoriesSaga), call(userSaga)]);
  }
  ```
</details>

<details>
  <summary>View Code (Category Saga)</summary>
  
  ```javascript
  import { takeLatest, all, call, put } from 'redux-saga/effects';
  import { getCategoriesAndDocuments } from '../../firebase/firebase.utils';
  import { fetchCategoriesSuccess, fetchCategoriesFailure } from './category.action';
  import { CATEGORIES_ACTION_TYPES } from './category.types';

  // Generators:
  export function* fetchCategoriesAsync() {
    try {
      // use `call` to turn it into an effect
      const categoryArray = yield call(getCategoriesAndDocuments, 'categories'); // callable method & its params
      yield put(fetchCategoriesSuccess(categoryArray)); // put is the dispatch inside a generator
    } catch (err) {
      console.log(`ERROR: ${err}`);
      yield put(fetchCategoriesFailure(err));
    }
  }

  export function* onFetchCategories() {
    // if many actions received, take the latest one
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
  }

  export function* categoriesSaga() {
    yield all([call(onFetchCategories)]); // this will pause execution of the below until it finishes
  }
  ```
</details>

### Redux Thunk for Categories
<details>
  <summary>View Code</summary>
  
  ```javascript
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
</details>

### React Context: useContext hook and CartContext and UserContext in the Navbar &rarr; later refactored to Redux.

<details>
  <summary>View Code (Navbar)</summary>
  
  ```javascript
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
</details>

<details>
  <summary>View Code (User Context)</summary>
  
  ```javascript
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
</details>

<details>
  <summary>View Code (Cart Context)</summary>
  
  ```javascript
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
</details>



## Challenges, Wins & Key Learning

### Challenges:
- Biggest challenge: Redux Saga (a lot of boilerplate set up and config to learn)
- TypeScript

### Wins
- First time integrating a payment gateway
- Design (horizontal scroll with fade out effects on the side)
