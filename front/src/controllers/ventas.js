/* eslint-disable func-names */
/* eslint-disable consistent-return */
import urlWebServices from './webServices';

export const crearVenta = async function (pago, mesaId, productos) {
  const url = urlWebServices.crearVenta;
  const itemsPrice = productos.reduce((a, c) => a + c.qty * c.price, 0);

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Origin', process.env.REACT_APP_API_URL);
  myHeaders.append('Accept', 'application/json');

  // armo json con datos
  const raw = JSON.stringify({
    mesa: mesaId,
    total: itemsPrice,
    pago,
    detalle: productos

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

export const listarVentas = async function (id) {
  const url = id ? (`${urlWebServices.listarVentas}/id/${id}`) : urlWebServices.listarVentas;

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Origin', process.env.REACT_APP_API_URL);
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

export const actualizarEstado = async function (id, n) {
  const url = `${urlWebServices.actualizarEstadoVenta}${id}`;

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Origin', process.env.REACT_APP_API_URL);
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

export default crearVenta;
