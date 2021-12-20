export const BASE_URL = 'https://api.mesto.adievme.nomoredomains.rocks';

const checkResponse = (res) => {
  // для ошибок 400 или 401 тоже возвращаем json для показа попапа с ошибкой 
  if (res.ok || (res.status === 400 || 401)) {
    return res.json()
  } 
  return Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(checkResponse)
  .then(res => res)
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(checkResponse)
  .then((data) => { 
    if (data){
      localStorage.setItem('jwt', data.jwt);
      return data;
    } else {
      return;
    }
  })
  .catch(err => console.log(err))
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(checkResponse)
    .then(data => data)
}