import {
  PEOPLE_FETCH_ATTEMPT,
  PEOPLE_FETCH_SUCCESS,
  PEOPLE_FETCH_FAILURE,
  PERSON_UPDATE_ATTEMPT,
  PERSON_UPDATE_SUCCESS,
  PERSON_UPDATE_FAILURE,
  PERSON_DELETE_ATTEMPT,
  PERSON_DELETE_SUCCESS,
  PERSON_DELETE_FAILURE,
  PERSON_CREATE_ATTEMPT,
  PERSON_CREATE_SUCCESS,
  PERSON_CREATE_FAILURE,
} from './../actions';

const initialState = {
  people: [],
  loading: false,
  initiallyLoaded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // read
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
        initiallyLoaded: true,
      };
    case PEOPLE_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
      };

    // update
    case PERSON_UPDATE_ATTEMPT:
      return {
        ...state,
        loading: true,
      };
    case PERSON_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case PERSON_UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
      };

    // delete
    case PERSON_DELETE_ATTEMPT:
      return {
        ...state,
        loading: true,
      };
    case PERSON_DELETE_SUCCESS:
      return {
        ...state,
        people: state.people.filter(person => person.id !== action.payload.id),
        loading: false,
      };
    case PERSON_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
      };

    // create
    case PERSON_CREATE_ATTEMPT:
      return {
        ...state,
        loading: true,
      };
    case PERSON_CREATE_SUCCESS:
      return {
        ...state,
        people: [...state.people, action.payload],
        loading: false,
      };
    case PERSON_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
