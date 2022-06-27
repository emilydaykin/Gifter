const CartItem = ({ cartItem }) => {
  return (
    <div className='cart-item'>
      <img className='cart-item__image' src={cartItem.imageUrl} alt={cartItem.name} />
      <div className='cart-item__text'>
        <h2 className='cart-item__name'>{cartItem.name}</h2>
        <span>
          {cartItem.quantity} x &euro;{cartItem.price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
