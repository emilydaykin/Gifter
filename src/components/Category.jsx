import React from 'react';

const Category = ({ category }) => {
  const { title, imageURL, key } = category;
  return (
    <div className={`category category--${key}`}>
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
          <p>Shop Now</p>
        </div>
      </div>
    </div>
  );
};

export default Category;
