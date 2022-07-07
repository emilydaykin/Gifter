import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from './categories/CategoriesPreview';
import Category from './categories/Category';

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;
