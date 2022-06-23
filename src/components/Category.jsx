import React from 'react';

const Category = ({ category }) => {
  const { title, imageURL, id } = category;
  return (
    <div className={id <= 2 ? 'category category--wide' : 'category category--narrow'}>
      <div
        className='category__image'
        style={{
          backgroundImage: `url(${imageURL})`,
          backgroundPosition: `${id === 3 ? 'center 60%' : id === 4 ? 'center 20%' : 'center'}`
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
