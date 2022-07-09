import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  return (
    <footer className='footer'>
      <p className='footer__text'>
        Designed &amp; Built by{' '}
        <Link className='footer__link' to={location.pathname === '/about' ? '#' : '/about'}>
          Emily Daykin
        </Link>{' '}
        &#x7E; Copyright &copy; 2022
      </p>
    </footer>
  );
};

export default Footer;
