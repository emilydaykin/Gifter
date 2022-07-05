// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  // signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'; // to create an auth instance
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore'; // doc = retrieve document _instance_ inside db, getDoc/setDoc: get/set doc _data_
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

// ------------------------ Authentication ------------------------ //
const provider = new GoogleAuthProvider(); // a class
provider.setCustomParameters({
  prompt: 'select_account' // everytime sb interacts with our (google) provider we always want them to select an account
});

export const auth = getAuth(); // singleton
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signUserInWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

// --------------------------- Storage --------------------------- //
export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  // create the collection
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db); // writes, deletes sets etc

  // map through each of the categories (christmas / bday etc)
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object); // firebase will give us back a document reference even if it doesn't exist yet - will just point to that place. Set that object in that docRef
  });

  await batch.commit(); // this begins firing it off
  console.log('done batching!');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');

  const targetQuery = query(collectionRef);

  const querySnapshot = await getDocs(targetQuery); // returns an array
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {}); // initial instance: empty object

  return categoryMap;
};

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid); // args: db, collection, identifier (created by google)
  const userSnapshot = await getDoc(userDocRef); // data

  // if user data does NOT exist, create (setDoc) in collection using userSnapshot
  if (!userSnapshot.exists()) {
    // if instance does not exist in db:
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo
      });
    } catch (err) {
      console.log(`Error creating user: ${err.message}`);
    }
  }
  // if user data exists, return userDocRef
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// Helper function (observable listener) - a permanently open listener (so must unmount it to avoid memory leaks):
export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback);
