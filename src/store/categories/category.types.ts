export enum CATEGORIES_ACTION_TYPES {
  FETCH_CATEGORIES_START = 'category/FETCH_CATEGORIES_START', // when we begin our API request
  FETCH_CATEGORIES_SUCCESS = 'category/FETCH_CATEGORIES_SUCCESS', // SET_CATEGORIES will now be set when it succeeds
  FETCH_CATEGORIES_FAILURE = 'category/FETCH_CATEGORIES_FAILURE'
}

export type CategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

export type Category = {
  title: string;
  imageUrl: string;
  items: CategoryItem[];
};

export type CategoryMap = {
  [key: string]: CategoryItem[];
};
