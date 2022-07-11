import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { getCategoriesAndDocuments } from '../firebase/firebase.utils';
import { setCategoriesMap } from '../store/categories/category.action';
import CategoriesPreview from './categories/CategoriesPreview';
import Category from './categories/Category';
// Uncomment to add items to DB
import allProducts from '../data/shop-data.js';
import { addCollectionAndDocuments } from '../firebase/firebase.utils';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Uncomment to add items to DB
    addCollectionAndDocuments('categories', allProducts); // 'categories' is the name i want for the collection

    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      // console.log('categoryMap', categoryMap);
      dispatch(setCategoriesMap(categoryMap));
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
