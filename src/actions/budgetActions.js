import { FETCH_BUDGET, NEW_BUDGET, EDIT_BUDGET } from './types';
import axios from 'axios';

export const fetchBudgets = () => dispatch => {  
  fetch('http://localhost:5000/budget/get-budget')
  .then(res => res.json())
  .then(result => {
    dispatch({
      type: FETCH_BUDGET,
      payload: result
    })
  });
};

export const createBudget = (data) => dispatch => {
  axios
  .post('http://localhost:5000/budget/add-budget', {
    headers: { 'Access-Control-Allow-Headers': '*' },
    body: JSON.stringify(data)
  })
  .then(res => {
    dispatch({
      type: NEW_BUDGET,
      payload: res.data
    })
  });
 
};

export const editBudget = (data) => dispatch => {
  console.log(JSON.stringify(data));
  axios
    .put('http://localhost:5000/budget/edit-budget', {
      headers: { 'Access-Control-Allow-Headers': '*' },
      body: JSON.stringify(data)
    })
    .then(res => {
      fetch('http://localhost:5000/budget/get-budget')
        .then(res => res.json())
        .then(result => {
          dispatch({
            type: EDIT_BUDGET,
            payload: result
          })
        });
    });
};