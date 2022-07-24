import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkUserSession } from './store/user/user.action';
import Loader from './components/Loader';

// Dynamic imports
const Home = lazy(() => import('./components/Home'));
const Navbar = lazy(() => import('./components/Navbar'));
const About = lazy(() => import('./components/About'));
const Shop = lazy(() => import('./components/Shop'));
const SignIn = lazy(() => import('./components/auth/SignIn'));
const Checkout = lazy(() => import('./components/checkout/Checkout'));

const App = () => {
  const dispatch = useDispatch(); // this will never change, so no need to pass it as a dependency array into the useEffect (but can do)

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

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

export default App;
