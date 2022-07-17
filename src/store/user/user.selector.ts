import { createSelector } from 'reselect';

import { UserState } from './user.reducer';

export const selectUserReducer = (state): UserState => state.user;

// Helper callback
export const selectCurrentUser = createSelector(selectUserReducer, (user) => user.currentUser);
