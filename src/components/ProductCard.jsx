import { useContext } from 'react';
import { CartContext } from '../contexts/cart.context';

const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <div className='product-card'>
      <img className='product-card__image' src={product.imageUrl} alt={product.name} />
      <button className='button product-card__button' onClick={addProductToCart}>
        Add to Cart
      </button>
      <div className='product-card__product-info'>
        <h3 className='product-card__product-name'>{product.name}</h3>
        <p className='product-card__product-price'>&euro;{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
