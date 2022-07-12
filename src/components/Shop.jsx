import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCategories } from '../store/categories/category.action';
import { getCategoriesAndDocuments } from '../firebase/firebase.utils';
import CategoriesPreview from './categories/CategoriesPreview';
import Category from './categories/Category';
// UNCOMMENT to add items to DB:
// import allProducts from '../data/shop-data.js';
// import { addCollectionAndDocuments } from '../firebase/firebase.utils';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // UNCOMMENT to add items to DB:
    // addCollectionAndDocuments('categories', allProducts); // setting name of collection to 'categories'

    const getCategoriesMap = async () => {
      const categoryArray = await getCategoriesAndDocuments('categories');
      dispatch(setCategories(categoryArray));
    };
    getCategoriesMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;
