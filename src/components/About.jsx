import githubLogo from '../assets/github-logo.png';
import linkedinLogo from '../assets/linkedin-logo.png';
import reactLogo from '../assets/react-logo.png';
import sassLogo from '../assets/sass-logo.png';
import reduxLogo from '../assets/redux-logo.png';
import firebaseLogo from '../assets/firebase-logo.png';
import Footer from './Footer';

const About = () => {
  return (
    <>
      <div className='about__wrapper'>
        <div className='about'>
          <div className='about__description'>
            <h1 className='about__heading'>About</h1>
            <p className='about__text'>
              Unsure of what to get your friends, family or loved ones for a special occasion? Use
              Gifter to find the right present for Christmas, their birthday, wedding day, your
              anniversary or simply as a thank you token. Browse inspiring gifts for him, for her or
              for them, any time of year!
            </p>
          </div>
          <div className='about__contact'>
            <h1 className='about__heading'>Contact</h1>
            <p>
              This site was designed and created by <strong>Emily Daykin</strong>. Get in touch to
              leave any feedback, collaborate, or to say hello!
            </p>
            <div className='about__contact-links'>
              <a href='https://github.com/emilydaykin'>
                <img className='about__link' src={githubLogo} alt='GitHub' />
              </a>
              <a href='https://www.linkedin.com/in/emily-daykin/'>
                <img className='about__link' src={linkedinLogo} alt='LinkedIn' />
              </a>
            </div>
          </div>
          <div className='about__created-with'>
            <h1 className='about__heading'>Created With</h1>
            <div className='about__icons'>
              <a href='https://reactjs.org/'>
                <img className='about__icon' src={reactLogo} alt='React' />
              </a>
              <a href='https://sass-lang.com/'>
                <img className='about__icon' src={sassLogo} alt='Sass' />
              </a>
              <a href='https://redux.js.org/'>
                <img className='about__icon' src={reduxLogo} alt='Redux' />
              </a>
              {/* <a href='#'>
            <img className='about__icon' src={reduxSagaLogo} alt='Redux Saga' />
          </a> */}
              {/* <a href='#'>
            <img className='about__icon' src={jestLogo} alt='Jest' />
          </a> */}
              <a href='https://firebase.google.com/'>
                <img className='about__icon' src={firebaseLogo} alt='Firebase' />
              </a>
              {/* <a href='#'>
            <img className='about__icon' src={stripeLogo} alt='Stripe' />
          </a>
          <a href='#'>
            <img className='about__icon' src={apolloLogo} alt='Apollo' />
          </a>
          <a href='#'>
            <img className='about__icon' src={graphQLLogo} alt='GraphQL' />
          </a>
          <a href='#'>
            <img className='about__icon' src={stripeLogo} alt='Stripe' />
          </a> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
