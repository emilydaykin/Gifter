import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import Shop from './components/Shop';
import SignIn from './components/auth/SignIn';
import Checkout from './components/Checkout';
import Birthday from './components/categories/Birthday';
import Christmas from './components/categories/Christmas';
import Anniversary from './components/categories/Anniversary';
import ThankYou from './components/categories/ThankYou';
import Wedding from './components/categories/Wedding';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='about' element={<About />} />
        <Route path='auth' element={<SignIn />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='birthday' element={<Birthday />} />
        <Route path='christmas' element={<Christmas />} />
        <Route path='anniversary' element={<Anniversary />} />
        <Route path='thank-you' element={<ThankYou />} />
        <Route path='wedding' element={<Wedding />} />
      </Route>
    </Routes>
  );
};

export default App;
