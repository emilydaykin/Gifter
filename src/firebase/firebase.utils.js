// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; // to create an auth instance

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyByG1IJFB8DKjLxbmyZ9ubep1_aXsr-znA', // allows for CRUD actions
  authDomain: 'gifter-db.firebaseapp.com',
  projectId: 'gifter-db',
  storageBucket: 'gifter-db.appspot.com',
  messagingSenderId: '976213120801',
  appId: '1:976213120801:web:ec403bc148a236a9aa5060',
  measurementId: 'G-6DY87Q957X'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const provider = new GoogleAuthProvider(); // a class
provider.setCustomParameters({
  prompt: 'select_account' // everytime sb interacts with our (google) provider we always want them to select an account
});

export const auth = getAuth(); // singleton
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
