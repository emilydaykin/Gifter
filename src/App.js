import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';

const Shop = () => {
  return <h1>Shop Page</h1>;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path='/shop' element={<Shop />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
