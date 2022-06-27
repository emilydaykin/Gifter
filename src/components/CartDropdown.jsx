const CartDropdown = () => {
  return (
    <div className='cart-dropdown'>
      <div className='cart-dropdown__cart-items'>
        <div className='cart-dropdown__cart-item'>item 1</div>
        <div className='cart-dropdown__cart-item'>item 2</div>
        <button className='button cart-dropdown__button'>Go to Checkout</button>
      </div>
    </div>
  );
};

export default CartDropdown;
