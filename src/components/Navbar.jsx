import { useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  const hideCartWhenNavigatingAway = () => {
    if (isCartOpen) {
      setIsCartOpen(!isCartOpen);
    }
  };

  const getSubText = () => {
    const pathElements = location.pathname.split('/');
    if (pathElements.length === 3) {
      return pathElements[2].toLowerCase().includes('thank') ? 'Thank You' : pathElements[2];
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
          <Link
            className={
              location.pathname.split('/')[1] === 'shop'
                ? 'navbar__link navbar__link--highlighted'
                : 'navbar__link'
            }
            to='/shop'
            onClick={hideCartWhenNavigatingAway}
          >
            Shop
            <span className='navbar__sub-link'>{getSubText()}</span>
          </Link>
          <Link
            className={
              location.pathname.split('/')[1] === 'about'
                ? 'navbar__link navbar__link--highlighted'
                : 'navbar__link'
            }
            to='/about'
            onClick={hideCartWhenNavigatingAway}
          >
            About
          </Link>
          {currentUser ? (
            <span className='navbar__link' onClick={signOutUser}>
              Sign Out
            </span>
          ) : (
            <Link
              className={
                location.pathname.split('/')[1] === 'auth'
                  ? 'navbar__link navbar__link--highlighted'
                  : 'navbar__link'
              }
              to='/auth'
              onClick={hideCartWhenNavigatingAway}
            >
              Sign In
            </Link>
          )}
          <span className='navbar__link' onClick={toggleShowHideCart}>
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
