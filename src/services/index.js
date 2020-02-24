import axios from 'axios';

export const loginService = (username) => {
//   const requestOptions = {
//     method: 'POST',
//     headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
//     body: JSON.stringify({ username: username})
//   };
  const options = {
    headers: { 'Access-Control-Allow-Headers': '*' },
    body: JSON.stringify({ username: username})
  }
  return axios.post(`http://localhost:5000/users/login`, options)
    //.then(handleResponse)
    .then(user => {
      localStorage.removeItem('user');
      if (user) {
        localStorage.setItem('user', JSON.stringify(user.data));
        return user;
      }
      else return null;
    });
};

export const registerService = user => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };
  return new Promise((resolve, reject) => {
    // // remove user from local storage to log user out
    fetch(`http://localhost:5000/users/register`, requestOptions).then(handleResponse);
    setTimeout(() => resolve());
  });
};

export const logoutService = () => {
  return new Promise((resolve, reject) => {
    // // remove user from local storage to log user out
    localStorage.removeItem('user');
    setTimeout(() => resolve());
  });
};

export const handleResponse = response => {
    console.log(response);
    return response.json().then(text => {
      const data = text && JSON.parse(text);
      console.log(data);
      if (!response.ok) {
        if (response.status === 401) {
          // auto logout if 401 response returned from api
          logoutService();
        //   location.reload(true);
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
  
      return data;
    });
  };
  