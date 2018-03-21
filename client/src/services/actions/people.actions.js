import axios from 'axios';
import { toast } from 'react-toastify';
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
} from './';

export const fetchPeople = () => {
  return (dispatch) => {
    dispatch({
      type: PEOPLE_FETCH_ATTEMPT,
    });
    setTimeout(() => {
      axios.get('/api/people')
        .then((res) => {
          dispatch({
            type: PEOPLE_FETCH_SUCCESS,
            payload: res.data.people,
          });
        }).catch((err) => {
          dispatch({
            type: PEOPLE_FETCH_FAILURE,
          });
        });
    }, 1000);
  };
};

export const updatePerson = (person) => {
  return (dispatch) => {
    dispatch({ type: PERSON_UPDATE_ATTEMPT });
    setTimeout(() => {
      axios.patch(`/api/people/${person.id}`, person)
        .then((res) => {
          dispatch({ type: PERSON_UPDATE_SUCCESS });
          toast('Presenter updated!', {
            type: 'success',
            className: 'px-4',
          });
        }).catch((err) => {
          dispatch({ type: PERSON_UPDATE_FAILURE });
          toast('Problem updating presenter :(', {
            type: 'error',
            className: 'px-4',
          });
        });
    }, 1000);
  };
};

export const deletePerson = (id) => {
  return (dispatch) => {
    dispatch({ type: PERSON_DELETE_ATTEMPT });
    setTimeout(() => {
      axios.delete(`/api/people/${id}`)
        .then((res) => {
          dispatch({
            type: PERSON_DELETE_SUCCESS,
            payload: res.data.deleted,
          });
          toast('Presenter deleted!', {
            type: 'success',
            className: 'px-4',
          });
        }).catch((err) => {
          dispatch({ type: PERSON_DELETE_FAILURE });
          toast('Problem deleting presenter :(', {
            type: 'error',
            className: 'px-4',
          });
        });
    }, 1000);
  };
};
