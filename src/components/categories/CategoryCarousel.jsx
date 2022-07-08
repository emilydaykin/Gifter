import { useState } from 'react';
import ProductCard from '../ProductCard';

const CategoryCarousel = ({ categoriesMap, title }) => {
  const [scrollLeft, setScrollLeft] = useState(false);
  const [scrollRight, setScrollRight] = useState(true);

  const handleXScroll = (event, title) => {
    let scrollWidthFromLeft = event.target.scrollLeft;
    let maxScrollWidth = event.target.scrollWidth - event.target.clientWidth;

    scrollWidthFromLeft > 0 ? setScrollLeft(true) : setScrollLeft(false);

    scrollWidthFromLeft === maxScrollWidth ? setScrollRight(false) : setScrollRight(true);
  };

  return (
    <div className='product-group__container'>
      <div className='product-group__fade-overlay'>
        <div
          className={
            scrollLeft
              ? 'product-group__fade-left product-group__fade-left--visible'
              : 'product-group__fade-left'
          }
        ></div>
        <div
          className={
            scrollRight
              ? 'product-group__fade-right product-group__fade-right--visible'
              : 'product-group__fade-right'
          }
        ></div>
      </div>
      <div className='product-group' onScroll={(event) => handleXScroll(event, title)}>
        {categoriesMap[title].map((product) => (
          <ProductCard key={product.id} product={product} preview={true} />
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
