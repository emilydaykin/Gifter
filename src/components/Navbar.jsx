// import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as GiftLogo } from '../assets/logo.svg';

const Navbar = () => {
  return (
    <>
      <div className='navbar'>
        <Link className='navbar__link navbar__link--main' to='/'>
          <GiftLogo className='navbar__logo' />
          <h1 className='navbar__heading'>Gifter</h1>
        </Link>
        <div className='navbar__links'>
          <Link className='navbar__link' to='/shop'>
            Shop
          </Link>
          <Link className='navbar__link' to='/about'>
            About
          </Link>
          <Link className='navbar__link' to='/auth'>
            Sign In
          </Link>
        </div>
      </div>
      <Outlet /> {/* Everything else will be rendered below the nav bar now! */}
    </>
  );
};

export default Navbar;
