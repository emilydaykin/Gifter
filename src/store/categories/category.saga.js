import { takeLatest, all, call, put } from 'redux-saga/effects';
import { getCategoriesAndDocuments } from '../../firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFailure } from './category.action';
import { CATEGORIES_ACTION_TYPES } from './category.types';

// Thunk:
// export const fetchCategoriesAsync = () => async (dispatch) => {
//   dispatch(fetchCategoriesStart());
//   try {
//     const categoryArray = await getCategoriesAndDocuments('categories');
//     dispatch(fetchCategoriesSuccess(categoryArray));
//   } catch (err) {
//     console.log(`ERROR: ${err}`);
//     dispatch(fetchCategoriesFailure(err));
//   }
// };

// Generators:
export function* fetchCategoriesAsync() {
  try {
    // use `call` to turn it into an effect
    const categoryArray = yield call(getCategoriesAndDocuments, 'categories'); // callable method & its params
    yield put(fetchCategoriesSuccess(categoryArray)); // put is the dispatch inside a generator
  } catch (err) {
    console.log(`ERROR: ${err}`);
    yield put(fetchCategoriesFailure(err));
  }
}

export function* onFetchCategories() {
  // if many actions received, take the latest one
  yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]); // this will pause execution of the below until it finishes
}
