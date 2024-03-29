import { CATEGORIES_ACTION_TYPES, Category } from './category.types';
import { createAction, Action, ActionWithPayload, withMatcher } from '../../reducer/reducer.utils';

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  Category[]
>;

export type FetchCategoriesFailure = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE,
  Error
>;

// Discriminating union type:
// export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailure;

// These are now extendible action creators:
export const fetchCategoriesStart = withMatcher(
  (): FetchCategoriesStart => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
);

export const fetchCategoriesSuccess = withMatcher(
  (categories: Category[]): FetchCategoriesSuccess =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories)
);

export const fetchCategoriesFailure = withMatcher(
  (error: Error): FetchCategoriesFailure =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE, error)
);
