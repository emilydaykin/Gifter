const CartItem = ({ cartItem }) => {
  return (
    <div className='cart-item'>
      <div className='cart-item__image'>
        <img src={cartItem.imageUrl} alt={cartItem.name} />
      </div>
      <div className='cart-item__text'>
        <h2 className='cart-item__name'>{cartItem.name}</h2>
        <span>
          {cartItem.quantity} x &euro;
          {cartItem.price % 1 > 0 ? cartItem.price.toFixed(2) : cartItem.price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
