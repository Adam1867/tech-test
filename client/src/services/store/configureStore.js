import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// import reducers
import peopleReducer from './../reducers/people.reducer';

export default () => {
  const store = createStore(
    combineReducers({
      people: peopleReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk),
  );
  return store;
};
