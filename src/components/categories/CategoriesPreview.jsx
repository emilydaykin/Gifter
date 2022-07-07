import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../ProductCard';

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  const navigate = useNavigate();

  const redirectToCategory = (category) => {
    console.log(`${category} category clicked`);
    navigate(`/shop/${category}`);
  };

  const randomItemsIndex = (maxIndex = 7) => {
    const randomIndices = [];
    let randomIndex;
    for (let i = 0; i < 4; i++) {
      randomIndex = Math.floor(Math.random() * maxIndex);
      while (randomIndices.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random() * maxIndex);
      }
      randomIndices.push(randomIndex);
    }
    console.log('randomIndices', randomIndices);
    return randomIndices;
  };

  const randomIndices = randomItemsIndex();

  return (
    <div className='shop'>
      {Object.keys(categoriesMap).map((title) => (
        <div key={title} className='shop__section'>
          <h1 className='shop__category'>
            {title} gifts <span onClick={() => redirectToCategory(title)}>&rarr;</span>
          </h1>
          <div className='product-group'>
            {categoriesMap[title]
              .filter((_, idx) => randomIndices.includes(idx))
              .map((product) => (
                <ProductCard key={product.id} product={product} preview={true} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesPreview;
