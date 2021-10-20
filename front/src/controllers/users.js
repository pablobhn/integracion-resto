import urlWebServices from './webServices';

export function setToken(userToken) {
  localStorage.setItem('token', JSON.stringify(userToken));
}

export function getToken() {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  if (userToken) {
    return userToken.token;
  }
  return '';
}

// eslint-disable-next-line func-names
// eslint-disable-next-line consistent-return
export const login = async function (values) {
  const url = urlWebServices.login;

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Origin', process.env.REACT_APP_API_URL);
  myHeaders.append('Accept', 'application/json');

  // armo json con datos
  const raw = JSON.stringify({
    username: values.email,
    password: values.password
  });

  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: myHeaders,
    body: raw
  });

  return response.json();
};
