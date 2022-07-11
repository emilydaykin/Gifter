// Displays all gifts for each category in DB
// path is `/shop/:category` for each category in DB
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/category.selector';
import ProductCard from '../ProductCard';
import Footer from '../Footer';

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <div className='shop'>
        <div className='shop__section'>
          <h1 className='shop__category shop__category--individual'>{category} gifts</h1>
          <div className='product-group product-group--individual'>
            {products ? (
              products.map((product) => (
                <ProductCard product={product} key={product.id} preview={false} />
              ))
            ) : (
              <p>Loading Products...</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Category;
