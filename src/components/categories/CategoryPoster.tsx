// Home Page Category Poster for each of the categories (to redirect to)
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoriesType } from './Categories';

type CategoryPosterProps = {
  category: CategoriesType;
};

const CategoryPoster: FC<CategoryPosterProps> = ({ category }) => {
  const { title, imageURL, key } = category;
  const navigate = useNavigate();

  const redirectToCategory = (categoryKey: string) => navigate(`/shop/${categoryKey}`);

  return (
    <div
      className={`category-poster category-poster--${key}`}
      onClick={() => redirectToCategory(category.key)}
    >
      <div
        className='category-poster__image'
        style={{
          backgroundImage: `url(${imageURL})`,
          backgroundPosition: `${
            key === 'anniversary' ? 'center 60%' : key === 'thank you' ? 'center 20%' : 'center'
          }`
        }}
      >
        <div className='category-poster__body'>
          <h2>{title}</h2>
          <p>Browse Now</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryPoster;
