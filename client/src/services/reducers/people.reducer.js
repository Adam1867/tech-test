import {
  PEOPLE_FETCH_ATTEMPT,
  PEOPLE_FETCH_SUCCESS,
  PEOPLE_FETCH_FAILURE,
} from './../actions';

const initialState = {
  people: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PEOPLE_FETCH_ATTEMPT:
      return {
        ...state,
        loading: true,
      };
    case PEOPLE_FETCH_SUCCESS:
      return {
        ...state,
        people: action.payload,
        loading: false,
      };
    case PEOPLE_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
