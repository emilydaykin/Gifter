import { createContext, useState, useEffect } from 'react';

import allProducts from '../data/shop-data.js';

// import { addCollectionAndDocuments } from '../firebase/firebase.utils';
import { getCategoriesAndDocuments } from '../firebase/firebase.utils';

export const CategoriesContext = createContext({
  // products: []
  categoriesMap: {}
});

export const CategoriesProvider = ({ children }) => {
  // const [products, setProducts] = useState(allProducts);
  const [categoriesMap, setCategoriesMap] = useState({});

  // useEffect cus we wanna fire this off just once to initialise Firestore
  useEffect(() => {
    // addCollectionAndDocuments('categories', allProducts); // 'categories' is the name i want for the collection
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log('categoryMap', categoryMap);
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };
  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};