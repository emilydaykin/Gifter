// import shopData from '../data/shop-data.json';
import { useContext } from 'react';
import { ProductsContext } from '../contexts/products.context';
import ProductCard from './ProductCard';

const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className='shop'>
      <h1 className='shop__category'>Birthday Gifts</h1>
      <div className='product-group'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <h1 className='shop__category'>Christmas Gifts</h1>
      <div className='product-group'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
