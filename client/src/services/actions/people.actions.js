import axios from 'axios';
import {
  PEOPLE_FETCH_ATTEMPT,
  PEOPLE_FETCH_SUCCESS,
  PEOPLE_FETCH_FAILURE,
} from './';

export const fetchPeople = (id) => {
  return (dispatch) => {
    dispatch({
      type: PEOPLE_FETCH_ATTEMPT,
    });
    setTimeout(() => {
      axios.get('/api/people', {
        method: 'GET',
      }).then((res) => {
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
  // return (dispatch) => {
  //   dispatch({
  //     type: PEOPLE_FETCH_ATTEMPT,
  //   });
  //   setTimeout(() => {
  //     axios.patch(`/api/people/${person.id}`, {
  //       method: 'GET',
  //     }).then((res) => {
  //       dispatch({
  //         type: PEOPLE_FETCH_SUCCESS,
  //         payload: res.data.people,
  //       });
  //     }).catch((err) => {
  //       dispatch({
  //         type: PEOPLE_FETCH_FAILURE,
  //       });
  //     });
  //   }, 1000);
  // };
};
