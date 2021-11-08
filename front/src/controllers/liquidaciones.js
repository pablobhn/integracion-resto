/* eslint-disable func-names */
/* eslint-disable consistent-return */
import urlWebServices from './webServices';

export const listarLiquidaciones = async function (id) {
  const url = id ? (`${urlWebServices.listarLiquidaciones}/id/${id}`) : urlWebServices.listarLiquidaciones;

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

export const actualizarEstadoLiquidacion = async function (id, n) {
  const url = `${urlWebServices.actualizarEstadoLiquidacion}${id}`;

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Origin', 'http://localhost:3000');
  myHeaders.append('Accept', 'application/json');

  const raw = JSON.stringify({
    nuevoEstado: n
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
