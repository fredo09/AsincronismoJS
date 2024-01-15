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
- Retorna el empleado por ID
- @param {} id
- @param {} callback
**/
let getEmpleado = (id, callback) => {
  // Buscamos el empleado por su id
  let empleadoDB = empleados.find((empleado) => empleado.id === id);
  if (!empleadoDB) {
    // Si el empleado no existe, entonces el primer argumento de
    // callback será un mensaje de error, y como segundo parametro
    // no tendrá nada, pues no se encontró el empleado
    callback(`El empleado con ID ${id} no existe en la base de datos`);
  } else {
    // No hay error (null como primer parametro), como segundo
    // parametro mandamos el empleado encontrado, este lo
    // obtendremos despues cuando llamemos a la funcion
    // getEmpleado, sigue leyendo..
    callback(null, empleadoDB);
  }
};

/**
- Retorna la informacion del salario de un empleado
- @param {} id
- @param {} callback
**/
let getSalario = (id, callback) => {
  // Buscamos el salario segun el id del empleado
  let salarioDB = salarios.find((salario) => id === salario.id);
  let empleadoDB = empleados.find((empleado) => id === empleado.id);
  if (!salarioDB) {
    callback(
      `No se encontró un salario para el empleado ${empleadoDB.nombre.toUpperCase()}`
    );
  } else {
    // parametro error null (no hay error),
    // en el segundo parametro armamos un objeto que
    // sera lo que obtendremos cuando llamemos la funcion getSalario
    callback(null, {
      id,
      nombre: empleadoDB.nombre,
      salario: salarioDB.salario,
    });
  }
};

//Callback para resolver el error y respose -> callback
let callbackGetEmpleado = (error, empleado) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("el empleado empleado de la base de datos es: ", empleado);
};

//
let callbackGetSalario = (error, salario) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("el salario del empleado de la base de datos es: ", salario);
};

//Hacemos el llamado a getEmpleado pasando el id del empeado y el callback donde se resulve el callback
//getEmpleado(3, callbackGetEmpleado);

//Hacemos el llamado a callbackGetSalario pasando el id y el callback para resolver
getSalario(2, callbackGetSalario);
