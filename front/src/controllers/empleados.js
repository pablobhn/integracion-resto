/* eslint-disable func-names */
/* eslint-disable consistent-return */
// import { moment } from 'moment';
import urlWebServices from './webServices';

export const crearEmpleado = async function (values) {
  const url = urlWebServices.crearEmpleado;

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Origin', 'http://localhost:3000');
  myHeaders.append('Accept', 'application/json');

  // armo json con datos
  const raw = JSON.stringify({
    name: values.name,
    address: values.address,
    tel: values.tel,
    rate: values.rate,
    horasBase: values.horasBase,
    fechaNacimiento: values.fechaNacimiento,
    fechaIngreso: values.fechaIngreso,
    // fechaNacimiento: moment(values.fechaNacimiento).format('YYYY-MM-DD'),
    // fechaIngreso: moment(values.fechaIngreso).format('YYYY-MM-DD'),
    role: values.role,
    status: 0
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

export const editarEmpleado = async function (values, empId) {
  const url = urlWebServices.editarEmpleado + empId;

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Origin', 'http://localhost:3000');
  myHeaders.append('Accept', 'application/json');

  // armo json con datos
  const raw = JSON.stringify({
    name: values.name,
    address: values.address,
    tel: values.tel,
    rate: values.rate,
    horasBase: values.horasBase,
    fechaNacimiento: values.fechaNacimiento,
    fechaIngreso: values.fechaIngreso,
    // fechaNacimiento: moment(values.fechaNacimiento).format('YYYY-MM-DD'),
    // fechaIngreso: moment(values.fechaIngreso).format('YYYY-MM-DD'),
    role: values.role,
    status: 0
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

export const registrarHoras = async function (id, value, values) {
  const url = (value === 0) ? (`${urlWebServices.empleadosHorasExtra}/id/${id}`) : (`${urlWebServices.empleadosFaltas}/id/${id}`);

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Origin', 'http://localhost:3000');
  myHeaders.append('Accept', 'application/json');

  const raw = JSON.stringify({
    fecha: values.fecha,
    horas: parseInt(values.horas, 10)
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

export default crearEmpleado;
