import { FC, EventHandler, useState, UIEvent } from 'react';
import { CategoryMap } from '../../store/categories/category.types';
import ProductCard from '../ProductCard';

type CategoryCarouselProps = {
  categoriesMap: CategoryMap;
  title: string;
};

const CategoryCarousel: FC<CategoryCarouselProps> = ({ categoriesMap, title }) => {
  const [scrollLeft, setScrollLeft] = useState(false);
  const [scrollRight, setScrollRight] = useState(true);

  const handleXScroll: EventHandler<React.UIEvent<HTMLDivElement>> = (
    event: UIEvent<HTMLDivElement>
  ) => {
    const eventTarget = event.target as HTMLInputElement;
    let scrollWidthFromLeft = eventTarget.scrollLeft;
    let maxScrollWidth = eventTarget.scrollWidth - eventTarget.clientWidth;

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
      <div className='product-group' onScroll={(event) => handleXScroll(event)}>
        {categoriesMap[title].map((product) => (
          <ProductCard key={product.id} product={product} preview={true} />
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
