import { CATEGORIES_ACTION_TYPES } from './category.types';

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false, // track whether it's in a loading state for the data it'll hold (will be false until something triggers it)
  error: null
};

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: payload, isLoading: false };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
