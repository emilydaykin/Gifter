// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  // signInWithRedirect,  // google
  signInWithPopup, // google
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
  User
} from 'firebase/auth'; // to create an auth instance
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot
} from 'firebase/firestore'; // doc = retrieve document _instance_ inside db, getDoc/setDoc: get/set doc _data_
import { Category } from '../store/categories/category.types';

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
export const signUserInWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

// --------------------------- Storage --------------------------- //
export const db = getFirestore();

export type ObjectToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
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

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories');

  const targetQuery = query(collectionRef);

  const querySnapshot = await getDocs(targetQuery); // returns an array
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category);
};

export type AdditionalInfo = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInfo = {} as AdditionalInfo
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
    } catch (error) {
      console.log(`Error creating user: ${error}`);
    }
  }
  // if user data exists, return userDocRef
  // return userDocRef;
  return userSnapshot as QueryDocumentSnapshot<UserData>; // we want the snapshot (not the docref pointer) now for redux saga
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// Helper function (observable listener) - a permanently open listener (so must unmount it to avoid memory leaks):
export const onAuthStateChangeListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

// --------------------------- For Redux Saga --------------------------- //

// Converting from an observable listener into a promise-based function call
// (since this is a permanently open listener, we must unmount it...
// ... (via unsubscribe) to avoid memory leaks:
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    // unsubscribe the moment we get a value
    const unsubscribe = onAuthStateChanged(
      // user is passed through this function ^ whenever they sign in, sign out or sign in with google
      auth,
      (userAuth) => {
        unsubscribe(); // to avoid memory leaks
        resolve(userAuth);
      },
      reject
    );
  });
};
