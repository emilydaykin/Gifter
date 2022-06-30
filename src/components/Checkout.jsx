import { useContext } from 'react';
import { CartContext } from '../contexts/cart.context';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  console.log('cartItems', cartItems);
  const data = {
    id: 1,
    name: '2-Piece Mug Set',
    imageUrl:
      'https://images.unsplash.com/photo-1542556398-95fb5b9f9b48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bXVnc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 10,
    quantity: 2
  };
  return (
    <>
      <h1>Checkout component</h1>
      <div className='checkout'>
        <div className='checkout__heading'>
          <p>Product</p>
          <p>Description</p>
          <p>Quanity</p>
          <p>Price (&euro;)</p>
          <p>Remove</p>
        </div>
        {cartItems.map((item) => (
          <div key={item.id} className='checkout__item'>
            <div className='checkout__item-image-container'>
              <img className='checkout__item-image' src={item.imageUrl} alt={item.name} />
            </div>
            <span>{item.name}</span>
            <div className='checkout__item-quantity'>
              <span>&lt;</span>
              <span>{item.quantity}</span>
              <span>&gt;</span>
            </div>
            <span>{item.price}</span>
            <span>X</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Checkout;
