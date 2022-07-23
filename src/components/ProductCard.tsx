import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../store/cart/cart.selector';
import { addItemToCart } from '../store/cart/cart.action';
import { CategoryItem } from '../store/categories/category.types';

type ProductCardProps = {
  product: CategoryItem;
  preview: boolean;
};

const ProductCard: FC<ProductCardProps> = ({ product, preview }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <div className={!preview ? 'product-card' : 'product-card product-card--preview'}>
      <img className='product-card__image' src={product.imageUrl} alt={product.name} />
      <button className='button product-card__button' onClick={addProductToCart}>
        Add to Cart
      </button>
      <div className='product-card__product-info'>
        <h3 className='product-card__product-name'>{product.name}</h3>
        <p className='product-card__product-price'>
          &euro;
          {product.price % 1 > 0
            ? product.price.toFixed(2).toLocaleString()
            : product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;