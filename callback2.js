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
let getSalario = (data, callback) => {
  // Buscamos el salario segun el id del empleado
  let salarioDB = salarios.find((salario) => data.id === salario.id);
  let empleadoDB = empleados.find((empleado) => data.id === empleado.id);
  if (!salarioDB) {
    callback(
      `No se encontró un salario para el empleado ${empleadoDB.nombre.toUpperCase()}`
    );
  } else {
    // parametro error null (no hay error),
    // en el segundo parametro armamos un objeto que
    // sera lo que obtendremos cuando llamemos la funcion getSalario
    callback(null, {
      id: data.id,
      nombre: empleadoDB.nombre,
      salario: salarioDB.salario,
    });
  }
};

//Obtenemos el empleado y despues el salario unificando los callbacks
// Primero obtenemos el empleado
getEmpleado(4, (error, empleado) => {
  if (error) {
    console.log(error);
    return;
  }
  // Si llegamos acá fue porque no hubo
  // error y tenemos en 'empleado' la
  // información, así que llamamos a getSalario

  getSalario(empleado, (error, salario) => {
    if (error) {
      console.log(error);
      return;
    }
    // Mostramos el objeto con la info. del salario
    console.log("El salario de la base de datos es:", salario.salario);
  });
  console.log("El empleado de la base de datos es: ", empleado.nombre);
});

/**
    Problemas de los Callbacks
    ¿Qué tal si necesitas una función que requiera el salario de un empleado para alguna lógica en específico? … 
    Tendrás que hacer mas llamados, anidados y el código se vuelve inmantenible.
**/
/**
// Primero obtenemos el empleado
getEmpleado(4, (error, empleado) => {
    ...
    getSalario(empleado, (error, salario) => {
        ...
        getPrimaExtralegal(salario, (error, primaExtralegal) => {
            ...
            getOtraFuncion(..)
            ....
            ...
        })
    })
}
Bueno, acá es donde vienen las promesas a echarnos una mano.
**/
