let empleados = [
  { id: 1, nombre: "Carlos" },
  { id: 2, nombre: "Andrés" },
  { id: 3, nombre: "Juan" },
];

let salarios = [
  { id: 1, salario: 2000 },
  { id: 2, salario: 3000 },
];

/**
 * Retorna una promesa que tiene los empleados
 * @param {*} id
 */
let getEmpleado = async (id) => {
  let empleadoDB = empleados.find((empleado) => empleado.id === id);
  if (!empleadoDB) {
    throw new Error(`El empleado con ID ${id}  no existe en la base de datos`);
  } else {
    return empleadoDB;
  }
};

/**
 *
 * @param {*} empleado
 */
let getSalario = async (empleado) => {
  let salarioDB = salarios.find((salario) => empleado.id === salario.id);
  if (!salarioDB) {
    throw new Error(
      `No se encontró un salario para el empleado ${empleado.nombre.toUpperCase()}`
    );
  } else {
    return {
      nombre: empleado.nombre,
      salario: salarioDB.salario,
      id: empleado.id,
    };
  }
};

let getInformacion = async (id) => {
  let empleado = await getEmpleado(id);
  let respuesta = await getSalario(empleado);
  return `El empleado ${respuesta.nombre} tiene un salario de ${respuesta.salario}$`;
};

getInformacion(2)
  .then((mensaje) => {
    console.log(mensaje);
  })
  .catch((error) => {
    console.log("error :", error);
  });
