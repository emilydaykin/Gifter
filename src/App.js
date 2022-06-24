import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';

const Shop = () => {
  return <h1>Shop Page</h1>;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/shop' element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
