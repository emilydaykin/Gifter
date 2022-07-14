import { CATEGORIES_ACTION_TYPES } from './category.types';
import { getCategoriesAndDocuments } from '../../firebase/firebase.utils';

export const fetchCategoriesStart = () => {
  return { type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START };
};

export const fetchCategoriesSuccess = (categories) => {
  return { type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, payload: categories };
};

export const fetchCategoriesFailure = (error) => {
  return { type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE, payload: error };
};
