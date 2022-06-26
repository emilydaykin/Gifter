// import shopData from '../data/shop-data.json';
import { useContext } from 'react';

import { ProductsContext } from '../contexts/products.context';

const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <>
      <h1>Birthday Gifts</h1>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            {/* <img src={product.imageUrl} alt={product.name} /> */}
            {product.name}
          </div>
        ))}
      </div>
      <h1>Christmas Gifts</h1>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            {/* <img src={product.imageUrl} alt={product.name} /> */}
            {product.name}
          </div>
        ))}
      </div>
    </>
  );
};

export default Shop;
