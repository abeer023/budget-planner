import { FETCH_TRANSACTION, NEW_TRANSACTION, DELETE_TRANSACTION } from './types';
import axios from 'axios';

export const fetchTransactions = () => dispatch => {  
  fetch('http://localhost:5000/transaction/get-transaction')
  .then(res => res.json())
  .then(result => {
    dispatch({
      type: FETCH_TRANSACTION,
      payload: result
    })
  });
};

export const createTransaction = (data) => dispatch => {
  console.log(data);
  axios
  .post('http://localhost:5000/transaction/add-transaction', {
    headers: { 'Access-Control-Allow-Headers': '*' },
    body: JSON.stringify(data)
  })
  .then(res => {
    dispatch({
      type: NEW_TRANSACTION,
      payload: res.data
    })
  });
 
};

export const deleteTransaction = (id) => dispatch => {
  axios
  .delete('http://localhost:5000/transaction/delete-transaction', {
    data: {
      headers: { 'Access-Control-Allow-Headers': '*' },
      id: id
    }
  })
  .then(res => {
    fetch('http://localhost:5000/transaction/get-transaction')
      .then(res => res.json())
      .then(result => {
        dispatch({
          type: DELETE_TRANSACTION,
          payload: result
        })
      });
  }); 
};