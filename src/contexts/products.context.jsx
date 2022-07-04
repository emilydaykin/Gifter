import { createContext, useState } from 'react';

import allProducts from '../data/shop-data.js';

export const ProductsContext = createContext({
  products: []
});

export const ProductsProvider = ({ children }) => {
  // const [products, setProducts] = useState(allProducts);
  const [products, setProducts] = useState([]);
  const value = { products };
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};
