/* eslint-disable func-names */
/* eslint-disable consistent-return */
import urlWebServices from './webServices';

export const crearEmpleado = async function (pago, mesaId, productos) {
  const url = urlWebServices.crearEmpleado;
  const itemsPrice = productos.reduce((a, c) => a + c.qty * c.price, 0);

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Origin', 'http://localhost:3000');
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

export const listarEmpleados = async function (id) {
  const url = id ? (`${urlWebServices.listarEmpleados}/id/${id}`) : urlWebServices.listarEmpleados;

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

export default crearEmpleado;
