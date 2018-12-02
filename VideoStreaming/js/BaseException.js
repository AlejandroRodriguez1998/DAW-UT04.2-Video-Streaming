//Excepción base para ir creando el resto de excepciones.
function BaseException() {
}
BaseException.prototype = new Error(); //Herencia del objeto Error.
BaseException.prototype.constructor = BaseException; //Definimos el constructor
//Sobrescribimos el método toString para personalizarlos
BaseException.prototype.toString = function(){
	// note that name and message are properties of Error
	return this.name + ": " + this.message;
};

//Excepción acceso inválido a constructor
function InvalidAccessConstructorException() {
	this.name = "InvalidAccessConstructorException";
	this.message = "El construstor no puede llamarse por una funcion.";
}
InvalidAccessConstructorException.prototype = new BaseException(); 
InvalidAccessConstructorException.prototype.constructor = InvalidAccessConstructorException;

//Excepción acceso inválido a constructor
function InvalidAccessDateException() {
	this.name = "InvalidAccessDateException";
	this.message = "El construstor de 'Date' no puede llamarse por una funcion.";
}
InvalidAccessDateException.prototype = new BaseException(); 
InvalidAccessDateException.prototype.constructor = InvalidAccessDateException;

//Excepción personalizada para indicar valores vacios.
function EmptyValueException(param) {
	this.name = "EmptyValueException";
	this.message = "Error: El parametro " + param + " no puede estar vacio.";
}
EmptyValueException.prototype = new BaseException(); //Heredamos de BaseException
EmptyValueException.prototype.constructor = EmptyValueException;