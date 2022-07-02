import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as GiftLogo } from '../assets/logo.svg';
import { UserContext } from '../contexts/user.context';
import { CartContext } from '../contexts/cart.context';
import { signOutUser } from '../firebase/firebase.utils';
import CartIcon from './cart/CartIcon';
import CartDropdown from './cart/CartDropdown';

const Navbar = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  const toggleShowHideCart = () => setIsCartOpen(!isCartOpen);

  const hideCartWhenNavigatingAway = () => {
    if (isCartOpen) {
      setIsCartOpen(!isCartOpen);
    }
  };
  return (
    <>
      <div className='navbar'>
        <Link
          className='navbar__link navbar__link--main'
          to='/'
          onClick={hideCartWhenNavigatingAway}
        >
          <GiftLogo className='navbar__logo' />
          <h1 className='navbar__heading'>Gifter</h1>
        </Link>
        <div className='navbar__links'>
          <Link className='navbar__link' to='/shop' onClick={hideCartWhenNavigatingAway}>
            Shop
          </Link>
          <Link className='navbar__link' to='/about' onClick={hideCartWhenNavigatingAway}>
            About
          </Link>
          {currentUser ? (
            <span className='navbar__link' onClick={signOutUser}>
              Sign Out
            </span>
          ) : (
            <Link className='navbar__link' to='/auth' onClick={hideCartWhenNavigatingAway}>
              Sign In
            </Link>
          )}
          <span className='navbar__link navbar__link--cart' onClick={toggleShowHideCart}>
            <CartIcon />
          </span>
        </div>
      </div>
      {isCartOpen && <CartDropdown />}
      <Outlet /> {/* Everything else will be rendered below the nav bar now! */}
    </>
  );
};

export default Navbar;
