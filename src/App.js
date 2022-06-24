import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import SignIn from './components/SignIn';

const Shop = () => {
  return <h1>Shop Page</h1>;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path='shop' element={<Shop />} />
          <Route path='about' element={<About />} />
          <Route path='sign-in' element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
