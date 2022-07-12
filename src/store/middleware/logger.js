// Currying:
export const loggerMiddleware = (store) => (next) => (action) => {
  // accounting for actions without types on them (i.e. not passed from us, e.g. via redux thunk)
  if (!action.type) {
    return next(action);
  }
  console.log('type:', action.type);
  console.log('payload:', action.payload);
  console.log('currentState:', store.getState());

  next(action);

  console.log('next state: ', store.getState());
};
