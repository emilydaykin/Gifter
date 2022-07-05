import { createContext, useState, useEffect } from 'react';

import allProducts from '../data/shop-data.js';

// import { addCollectionAndDocuments } from '../firebase/firebase.utils';
import { getCategoriesAndDocuments } from '../firebase/firebase.utils';

export const ProductsContext = createContext({
  products: []
});

export const ProductsProvider = ({ children }) => {
  // const [products, setProducts] = useState(allProducts);
  const [products, setProducts] = useState([]);

  // useEffect cus we wanna fire this off just once to initialise Firestore
  useEffect(() => {
    // addCollectionAndDocuments('categories', allProducts); // 'categories' is the name i want for the collection
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log('categoryMap', categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { products };
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};
