/* eslint-disable func-names */
/* eslint-disable consistent-return */
import urlWebServices from './webServices';

export const crearProducto = async function (values, imgSrc) {
  const url = urlWebServices.crearProducto;

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Origin', 'http://localhost:3000');
  myHeaders.append('Accept', 'application/json');

  // armo json con datos
  const raw = JSON.stringify({
    title: values.name,
    price: values.price,
    description: values.description,
    type: values.type,
    sinTac: values.sinTac,
    vegano: values.vegano,
    imgSrc,
    avatarUrl: imgSrc,
    qty: 0

  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: myHeaders,
      body: raw
    });

    const data = await response.json();

    if (data) {
      return {
        error: false,
        data
      };
    }
  } catch (error) {
    return {
      error: true
    };
  }
};

export const editarProducto = async function (values, imgSrc, prodId) {
  const url = urlWebServices.editarProducto + prodId;

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Origin', 'http://localhost:3000');
  myHeaders.append('Accept', 'application/json');

  // armo json con datos
  const raw = JSON.stringify({
    title: values.name,
    price: values.price,
    description: values.description,
    type: values.type,
    sinTac: values.sinTac,
    vegano: values.vegano,
    imgSrc,
    avatarUrl: imgSrc,
    qty: 0

  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: myHeaders,
      body: raw
    });

    const data = await response.json();

    if (data) {
      return {
        error: false,
        data
      };
    }
  } catch (error) {
    return {
      error: true
    };
  }
};

export const listarProductos = async function (id) {
  const url = id ? (`${urlWebServices.listarProductos}/id/${id}`) : urlWebServices.listarProductos;

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Origin', 'http://localhost:3000');
  myHeaders.append('Accept', 'application/json');

  try {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: myHeaders
    });

    const data = await response.json();

    if (data) {
      return {
        error: false,
        data
      };
    }
  } catch (error) {
    return {
      error: true
    };
  }
};

export const borrarProducto = async function (id) {
  const url = urlWebServices.borrarProducto + id;

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Origin', 'http://localhost:3000');
  myHeaders.append('Accept', 'application/json');

  const response = await fetch(url, {
    method: 'post'
  });

  return response.json();
};
