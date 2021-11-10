/* eslint-disable func-names */
/* eslint-disable consistent-return */

import urlWebServices from './webServices';

export const crearEmpresa = async function (values) {
  const url = urlWebServices.crearEmpresa;

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Origin', 'http://localhost:3000');
  myHeaders.append('Accept', 'application/json');

  // armo json con datos
  const raw = JSON.stringify({
    name: values.name,
    address: values.address,
    cuit: values.cuit,
    situacionIva: values.situacionIva,
    imp: (values.imp / 100),
    descuento: (values.descuento / 100),
    tel: values.tel,
    email: values.email,
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

export const editarEmpresa = async function (empId, values) {
  const url = urlWebServices.editarEmpresa + empId;

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Origin', 'http://localhost:3000');
  myHeaders.append('Accept', 'application/json');

  // armo json con datos
  const raw = JSON.stringify({
    name: values.name,
    address: values.address,
    cuit: values.cuit,
    situacionIva: values.situacionIva,
    imp: (values.imp / 100),
    descuento: (values.descuento / 100),
    tel: values.tel,
    email: values.email,
    // fechaNacimiento: moment(values.fechaNacimiento).format('YYYY-MM-DD'),
    // fechaIngreso: moment(values.fechaIngreso).format('YYYY-MM-DD'),
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

export const getDescuento = async function (dni) {
  const url = urlWebServices.getDescuento + dni;

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Origin', 'http://localhost:3000');
  myHeaders.append('Accept', 'application/json');

  try {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: myHeaders,
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

export const listarEmpresas = async function (id) {
  const url = id ? (`${urlWebServices.listarEmpresas}/id/${id}`) : urlWebServices.listarEmpresas;

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

export const agregarCuentaCorriente = async function (descuento) {
  if (descuento.porcentaje === 0) {
    return true;
  }

  const url = urlWebServices.agregarCuentaCorriente + descuento.idEmpresa;

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Origin', 'http://localhost:3000');
  myHeaders.append('Accept', 'application/json');

  // armo json con datos
  const raw = JSON.stringify({
    porcentaje: descuento.porcentaje,
    montoDescuento: descuento.montoDescuento,
    dni: descuento.dni,
    fecha: descuento.fechaVenta,
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
