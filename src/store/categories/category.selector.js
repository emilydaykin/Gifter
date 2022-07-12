import { createSelector } from 'reselect'; // memoises selectors for you!

const selectCategoryReducer = (state) => state.categories;
// memoised selector:
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories // will only rerun if the output from selectCategoryReducer is different
);

// Helper callback memoised
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
  // initial instance: empty object
);
