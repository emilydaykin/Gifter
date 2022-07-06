import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoriesContext } from '../contexts/categories.context';
import ProductCard from './ProductCard';

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  const navigate = useNavigate();

  const redirectToCategory = (category) => {
    category === 'thank you' ? navigate('/thank-you') : navigate(`/${category}`);
  };

  return (
    <div className='shop'>
      {Object.keys(categoriesMap).map((title) => (
        <div key={title} className='shop__section'>
          <h1 className='shop__category'>
            {title} gifts <span onClick={() => redirectToCategory(title)}>&rarr;</span>
          </h1>
          <div className='product-group'>
            {categoriesMap[title].map((product) => {
              return product.id <= 4 ? (
                <ProductCard key={product.id} product={product} />
              ) : (
                <p key={product.id}></p>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shop;
