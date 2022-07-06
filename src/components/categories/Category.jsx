// import React from 'react';
import { useNavigate } from 'react-router-dom';

const Category = ({ category }) => {
  const { title, imageURL, key } = category;
  const navigate = useNavigate();

  const redirectToCategory = (category) => navigate(`/${category}`);

  return (
    <div className={`category category--${key}`} onClick={() => redirectToCategory(category.key)}>
      <div
        className='category__image'
        style={{
          backgroundImage: `url(${imageURL})`,
          backgroundPosition: `${
            key === 'anniversary' ? 'center 60%' : key === 'thank-you' ? 'center 20%' : 'center'
          }`
        }}
      >
        <div className='category__body'>
          <h2>{title}</h2>
          <p>Browse Now</p>
        </div>
      </div>
    </div>
  );
};

export default Category;
