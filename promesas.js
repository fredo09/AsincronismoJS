/**
Simulamos una base de datos de 3 empleados: Carlos,
Andrés y Juan, y los salarios que ellos ganan relacionados
por su ID:

- Carlos gana 2000
- Andrés gana 5000
- Juan no posee información de salario en el momento.
**/

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
- Retorna una promesa que tiene los empleados
- @param {} id : SOLO RECIBE UN ID, NO RECIBE CALLBACKS!!
**/
let getEmpleado = (id) => {
  return new Promise((resolve, reject) => {
    let empleadoDB = empleados.find((empleado) => empleado.id === id);
    if (!empleadoDB) {
      // Algo salio mal, entonces usamos reject
      reject(`El empleado con ID ${id} no existe en la BBDD`);
    } else {
      // Todo OK, usamos resolve para devolver nuestro objeto.
      resolve(empleadoDB);
    }
  });
};

/**
@param {} empleado
**/
let getSalario = (empleado) => {
  return new Promise((resolve, reject) => {
    let salarioDB = salarios.find((salario) => empleado.id === salario.id);
    if (!salarioDB) {
      reject(
        `No se encontró un salario para el empleado ${empleado.nombre.toUpperCase()}`
      );
      return;
    }
    resolve({
      id: empleado.id,
      empleado: empleado.nombre,
      salario: salarioDB.salario,
    });
  });
};

/**
 * Separamos el resolve y reject
 */
// let resolve = (empleado) => {
//   console.log("El empleado de la Base de datos es: ", empleado);
// };

// let reject = (error) => {
//   console.log(error);
// };

//Ejecutando el empleado usando resolve y reject separado
//getEmpleado(1).then(resolve).catch(reject);

//Llamando a la funcion para llamar al empleado si su id existe usando promesas
// getEmpleado(6)
//   .then((empleado) => {
//     console.log("El empleado de la Base de datos es: ", empleado);
//   })
//   .catch((error) => console.log(error));

getEmpleado(2)
  .then((empleado) => {
    /** En este primer "then" estamos resolviendo
    exitosamente la Promise devuelta por el
    método getEmpleado.
    Retornamos la función getSalario con el
    empleado en particular, como ya vimos, getSalario
    devuelve una nueva Promise. Entonces
    podemos "encadenar" otro "then" mas abajo que hará alusión
    a la Promise retornada por el método getSalario. **/
    return getSalario(empleado);
  })
  .then((objInfoSalario) => {
    // En este segundo "then" estamos resolviendo exitosamente la
    // Promesa devuelta por el método getSalario.
    console.log(
      `El salario de 🧑  ${objInfoSalario.empleado} es ${objInfoSalario.salario}$🤑  `
    );
  })
  .catch((error) => console.log(error));
// Este catch, nos sirve para cualquier error, ya sea de la Promise
// devuelta por el método getEmpleado o por el método getSalario.
