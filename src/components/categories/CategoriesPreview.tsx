import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectCategoriesMap,
  selectCategoriesIsLoading
} from '../../store/categories/category.selector';
import CategoryCarousel from './CategoryCarousel';
import Loader from '../Loader';
import Footer from '../Footer';

const CategoriesPreview: FC = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const navigate = useNavigate();
  const isLoading = useSelector(selectCategoriesIsLoading);

  const redirectToCategory = (category: string) => {
    navigate(`/shop/${category}`);
  };

  return (
    <>
      <div className='shop'>
        {isLoading ? (
          <Loader />
        ) : (
          Object.keys(categoriesMap).map((title) => (
            <div key={title} className='shop__section'>
              <h1 className='shop__category'>
                {title} gifts <span onClick={() => redirectToCategory(title)}>&rarr;</span>
              </h1>
              <CategoryCarousel categoriesMap={categoriesMap} title={title} />
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoriesPreview;
