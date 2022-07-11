import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAuthStateChangeListener, createUserDocumentFromAuth } from './firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.action';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import Shop from './components/Shop';
import SignIn from './components/auth/SignIn';
import Checkout from './components/checkout/Checkout';

const App = () => {
  const dispatch = useDispatch(); // this will never change, so no need to pass it as a dependency array into the useEffect (but can do)

  useEffect(() => {
    // this is a permanently open listener (so must unmount it to avoid memory leaks):
    const unsubscribe = onAuthStateChangeListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user); // if already exists, we simply get back userDocRef
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='about' element={<About />} />
        <Route path='auth' element={<SignIn />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
