/**
 *  Callback basico usando setTimeout
 **/

setTimeout(function () {
  console.log("Hola Mundo");
}, 3000);

//Otra forma para hacerlo

let callback = function () {
  console.log("this is a callback");
};

setTimeout(3000, callback); //Bien
//setTimeout(5000, callback()); // Mal
