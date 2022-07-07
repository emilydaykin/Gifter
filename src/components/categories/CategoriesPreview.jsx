import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../ProductCard';

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  const navigate = useNavigate();

  const redirectToCategory = (category) => {
    console.log(`${category} category clicked`);
    // category === 'thank you' ? navigate('/shop/thank-you') : navigate(`/shop/${category}`);
    navigate(`/shop/${category}`);
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
                <ProductCard key={product.id} product={product} preview={true} />
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

export default CategoriesPreview;
