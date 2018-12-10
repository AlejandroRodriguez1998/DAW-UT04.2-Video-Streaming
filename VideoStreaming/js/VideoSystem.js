"use strict";
// Objeto VideoSystem


function VideoSystemException() {
	this.name = "VideoSystemException";
	this.message = "Error: Video System Exception Generica.";
}
VideoSystemException.prototype = new BaseException(); //Heredamos de BaseException
VideoSystemException.prototype.constructor = VideoSystemException;

function CategoryVideoSystemException() {
	this.name = "CategoryVideoSystemException";
	this.message = "Error: El metodo necesita una categoria como parametro.";
}
CategoryVideoSystemException.prototype = new VideoSystemException(); //Heredamos de VideoSystemException
CategoryVideoSystemException.prototype.constructor = CategoryVideoSystemException;

function CategoryExistsVideoSystemException() {
	this.name = "CategoryExistsVideoSystemException";
	this.message = "Error: La categoria existe en el sistema de video.";
}
CategoryExistsVideoSystemException.prototype = new VideoSystemException(); //Heredamos de VideoSystemException
CategoryExistsVideoSystemException.prototype.constructor = CategoryExistsVideoSystemException;

function CategoryNotExistsVideoSystemException() {
	this.name = "CategoryNotExistsVideoSystemException";
	this.message = "Error: La categoria no existe en el sistema de video.";
}
CategoryNotExistsVideoSystemException.prototype = new VideoSystemException(); //Heredamos de VideoSystemException
CategoryNotExistsVideoSystemException.prototype.constructor = CategoryNotExistsVideoSystemException;

function UserVideoSystemException() {
	this.name = "UserVideoSystemException";
	this.message = "Error: El metodo necesita un usuario como parametro.";
}
UserVideoSystemException.prototype = new VideoSystemException(); //Heredamos de VideoSystemException
UserVideoSystemException.prototype.constructor = UserVideoSystemException;

function UserExistsVideoSystemException() {
	this.name = "UserExistsVideoSystemException";
	this.message = "Error: El usuario existe en el sistema de video.";
}
UserExistsVideoSystemException.prototype = new VideoSystemException(); //Heredamos de VideoSystemException
UserExistsVideoSystemException.prototype.constructor = UserExistsVideoSystemException;

function UserNotExistsVideoSystemException() {
	this.name = "UserNotExistsVideoSystemException";
	this.message = "Error: El usuario no existe en el sistema de video.";
}
UserNotExistsVideoSystemException.prototype = new VideoSystemException(); //Heredamos de VideoSystemException
UserNotExistsVideoSystemException.prototype.constructor = UserNotExistsVideoSystemException;

function ProductionVideoSystemException() {
	this.name = "ProductionVideoSystemException";
	this.message = "Error: El metodo necesita una producion como paramentro.";
}
ProductionVideoSystemException.prototype = new VideoSystemException(); //Heredamos de VideoSystemException
ProductionVideoSystemException.prototype.constructor = ProductionVideoSystemException;

function ProductionExistsVideoSystemException() {
	this.name = "ProductionExistsVideoSystemException";
	this.message = "Error: La producion existe en el sistema.";
}
ProductionExistsVideoSystemException.prototype = new VideoSystemException(); //Heredamos de VideoSystemException
ProductionExistsVideoSystemException.prototype.constructor = ProductionExistsVideoSystemException;

function ProductionNotExistsVideoSystemException() {
	this.name = "ProductionNotExistsVideoSystemException";
	this.message = "Error: La producion no existe en el sistema.";
}
ProductionNotExistsVideoSystemException.prototype = new VideoSystemException(); //Heredamos de VideoSystemException
ProductionNotExistsVideoSystemException.prototype.constructor = ProductionNotExistsVideoSystemException;

function PersonVideoSystemException() {
	this.name = "PersonVideoSystemException";
	this.message = "Error: El metodo necesita una persona como paramentro.";
}
PersonVideoSystemException.prototype = new VideoSystemException(); //Heredamos de VideoSystemException
PersonVideoSystemException.prototype.constructor = PersonVideoSystemException;

function PersonExistsVideoSystemException() {
	this.name = "PersonExistsVideoSystemException";
	this.message = "Error: La persona existe en el sistema.";
}
PersonExistsVideoSystemException.prototype = new VideoSystemException(); //Heredamos de VideoSystemException
PersonExistsVideoSystemException.prototype.constructor = PersonExistsVideoSystemException;

function PersonNotExistsVideoSystemException() {
	this.name = "PersonNotExistsVideoSystemException";
	this.message = "Error: La persona no existe en el sistema.";
}
PersonNotExistsVideoSystemException.prototype = new VideoSystemException(); //Heredamos de VideoSystemException
PersonNotExistsVideoSystemException.prototype.constructor = PersonNotExistsVideoSystemException;

var VideoSystem = (function () { //La función anónima devuelve un método getInstance que permite obtener el objeto único
	var instantiated; //Objeto con la instancia única VideoSystem

	function init() { //Inicialización del Singleton

		//Declaración de la función constructora de la instancia VideoSystem
		function VideoSystem(){
			//La función se invoca con el operador new
			if (!(this instanceof VideoSystem)) 
				throw new InvalidAccessConstructorException();

			/* Definición del atributo name */
			var _name = "";
			Object.defineProperty(this, 'name', {
				get:function(){
					return _name;
				},
				set:function(name = ""){
					name = name.trim();
					if (name === 'undefined' || name === "") throw new EmptyValueException("name");					
					_name = name;
				}		
			});
			
			/* Definición del atributo categories como array para contener todas las categorías del sistema. */
			var _categories = []; //array de categorías.

			//Devuelve un iterator de los autores del gestor
			Object.defineProperty(this, 'categories', {
				get:function(){
				    var nextIndex = 0;		    
				    return {
				        next: function(){
				            return nextIndex < _categories.length ?
				            {value: _categories[nextIndex++].category, done: false} : {done: true};
				        }
				    }
				}	
			});	

			//Añade un nueva categoria al gestor
			this.addCategory = function(category){
				if (!(category instanceof Category)) { 
					throw new CategoryVideoSystemException();
				}		
				var position = getCategoryPosition(category); 	
				if (position === -1){
					_categories.push(
						{
							category: category,
							productions:[]
						}
					);
				} else{
					throw new CategoryExistsVideoSystemException();
				}	

				return _categories.length;
			}

			//Elimina una categoría del gestor
			this.removeCategory = function(category){
				if (!(category instanceof Category)) { 
					throw new CategoryVideoSystemException();
				}		
				var position = getCategoryPosition(category); 	
				if (position !== -1){
					_categories.splice(position, 1);				
				} else{
					throw new CategoryNotExistsVideoSystemException();
				}	
				return _categories.length;
			}

			//Dado una categoría, devuelve la posición de esa categoría en el array de categorías o -1 si no lo encontramos.
			function getCategoryPosition(category){
				if (!(category instanceof Category)) { 
					throw new CategoryVideoSystemException();
				}		

				function compareElements(element) {
				  return (element.category.name === category.name)
				}
				
				return _categories.findIndex(compareElements);		
			}

			var _users = []; //array con los users del sistema.
			//Devuelve un iterator de los usuarios del sistema
			Object.defineProperty(this, 'users', {
				get:function(){
				    var nextIndex = 0;		    
				    return {
				       	next: function(){
							return nextIndex < _users.length ?
							{value: _users[nextIndex++], done: false} : {done: true};
				        }
				    }
				}	
			});	

			//Añade un nuevo usuario al sistema
			this.addUser = function(user){
				if (!(user instanceof User)) { 
					throw new UserVideoSystemException ();
				}
				//Compruebo que el surname no este registrado, lo busco
				var positionName = getUserNamePosition(user); 
				if (positionName !== -1){ //Si existe lanzo una excepcion
					throw new UserExistsVideoSystemException();
				} 
				//Compruebo que el email no este registrado, lo busco
				var positionEmail = getUserEmailPosition(user);
				if(positionEmail !== -1){ //Si existe lanzo una excepcion
					throw new EmailExistsVideoSystemExeption();
				}
				//Si no ha saltado ninguna exepcion añado el usuario al sistema, lo añado
				_users.push(user);

				return _users.length; //Devuelvo el nº elementos
			}

			//Elimina un nuevo usuario del sistema
			this.removeUser = function(user){
				if (!(user instanceof User)) { 
					throw new UserVideoSystemException ();
				}		
				var position = getUserPosition(user); 	
				if (position !== -1){
					_users.splice(position, 1);															
				} else{
					throw new UserNotExistsVideoSystemException();
				}	
				return _users.length;
			}

			//Dado un usuario, devuelve la posición de ese usu en el array de usuarios o -1 si no lo encontramos.
			function getUserNamePosition(user){
				if (!(user instanceof User)) { 
					throw new UserVideoSystemException ();
				}	
				
				function compareElements(element) {
					return (element.username === user.username)
				}
	  
				return _users.findIndex(compareElements);		
			}

			//Dado un usuario, devuelve la posición de ese usu en el array de usuarios o -1 si no lo encontramos.
			function getUserEmailPosition(user){
				if (!(user instanceof User)) { 
					throw new UserVideoSystemException ();
				}	
				
				function compareElements(element) {
					return (element.email === user.email)
				}
	  
				return _users.findIndex(compareElements);	
			}

			/* Definición del atributo directors como array para contener todos las produciones del gestor. */
			var _productions = []; //array con las produciones del sistema.
			//Devuelve un iterator de los produciones del gestor
			Object.defineProperty(this, 'productions', {
				get:function(){
					var nextIndex = 0;		    
					return {
						next: function(){
							return nextIndex < _productions.length ?
								{value: _productions[nextIndex++], done: false} : {done: true};
						}
					}
				}	
			});

			//Añade una nueva producion al sistema
			this.addProduction = function(production){
				if(!(production instanceof Production)){
					throw new ProductionVideoSystemException;
				}
				
				var position = getProductionPosition(production); 
				//Si no existe la produccion se añade al array	
				if (position === -1){
					_productions.push(production);
				} else{
					throw new ProductionExistsVideoSystemException();
				}
				return _productions.length;
			};

			//Elimina una producion del gestor
			this.removeProduction = function(production){
				if(!(production instanceof Production)){
					throw new ProductionVideoSystemException;
				}
				
				var position = getProductionPosition(production);
				if (position !== -1){
					_productions.splice(position, 1);			
				} else{
					throw new ProductionNotExistsVideoSystemException();
				}	
				return _productions.length;
			};

			//Dado una producion, devuelve la posición de ese usu en el array de usuarios o -1 si no lo encontramos.
			this.getProductionPosition = function(production){
				if(!(production instanceof Production)){
					throw new ProductionVideoSystemException;
				}

				function compareElements(element) {
				  return (element.title === production.title)
				}
				return _productions.findIndex(compareElements);		
			}

			/* Definición del atributo actor como array para contener todos las produciones del gestor. */
			var _actors = []; //array con los actores del sistema.
			//Devuelve un iterador que permite recorrer los actores registrados en el sistema
			Object.defineProperty(this, 'actors', {
				get:function(){
					var nextIndex = 0;		    
					return {
						next: function(){
							return nextIndex < _actors.length ?
								{value: _actors[nextIndex++].actor, done: false} : {done: true};
						}
					}
				}	
			});

			//Añade una nuevo actor
			this.addActor = function(actor){
				if(!(actor instanceof Person)){
					throw new PersonVideoSystemException ();
				}
				
				var position = getActorPosition(actor); 
				//Si la posicion de position es igual a -1, no
				//existe ningun actor con el mismo nombre
				if (position === -1){
					_actors.push(
						{
							actor: actor,
							productions: []
						}
					);
				} else{
					throw new PersonExistsVideoSystemException;
				}
				return _actors.length;
			};

			//Elimina un actor del sistema
			this.removeActor = function(actor){
				if(!(actor instanceof Person)){
					throw new PersonVideoSystemException();
				}

				var position = this.getActorPosition(actor);
				if (position !== -1){
					_actors.splice(position, 1);			
				} else{
					throw new PersonNotExistsVideoSystemException();
				}
				return _actors.length;
			};

			//Dado un objeto Actor, devuelve la posición de ese objeto.
			this.getActorPosition = function(actor){
				if(!(actor instanceof Person)){
					throw new PersonVideoSystemException();
				}

				function compareElements(element) {
				  return (element.name === actor.name || arrayActor.lastName1 === actor.lastName1)
				}
				return _actors.findIndex(compareElements);		
			}

			/* Definición del atributo directors como array para contener todos los directores del gestor. */
			var _directors = []; //array con los directores del sistema.
			//Devuelve un iterator de los directores del gestor
			Object.defineProperty(this, 'directors', {
				get:function(){
				    var nextIndex = 0;		    
				    return {
				       next: function(){
				           return nextIndex < _directors.length ?
				               {value: _directors[nextIndex++], done: false} :
				               {done: true};
				       }
				    }
				}	
			});	

			//Añade un nuevo director al sistema
			this.addDirector = function(person){
				//Comprobamos que el director se crea con el operador new
				if (!(person instanceof Person)) { 
					throw new PersonVideoSystemException ();
				}	

				var position = getDirectorPosition(person);
				
				//Si el nombre del director no está en el sistema...
				if ((position === -1)){
					_directors.push(person); //Lo añadimos
				}else{
					throw new PersonExistsVideoSystemException(); //Lanzamos una excepcion
				}

				return _directors.length; //Devuelvo el numero de elementos
			}

			//Elimina un nuevo director del sistema
			this.removeDirector = function(person){
				if (!(person instanceof Person)) { 
					throw new PersonVideoSystemException ();
				}		
				var position = getDirectorPosition(person); 	
				if (position !== -1){
					_directors.splice(position, 1);															
				} else{
					throw new PersonNotExistsVideoSystemException();
				}	
				return _directors.length;
			}

			//Dado un director, devuelve la posición de ese director en el array de directores o -1 si no lo encontramos.
			function getDirectorPosition(person){
				if (!(person instanceof Person)) { 
					throw new PersonVideoSystemException ();
				}		

				function compareElements(element) {
				  return (element.name === person.name)
				}
				
				return _directors.findIndex(compareElements);		
			}
		
		} //Fin constructor VideoSystem
		VideoSystem.prototype = {}; 
		VideoSystem.prototype.constructor = VideoSystem;

		var instance = new VideoStreaming();//Devolvemos el objeto VideoSytem para que sea una instancia única.
		Object.freeze(instance);
		return instance;
	} //Fin inicialización del Singleton
	return {
		// Devuelve un objeto con el método getInstance
		getInstance: function () { 
			if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
				instantiated = init(); //instantiated contiene el objeto único
			}
			return instantiated; //Si ya está asignado devuelve la asignación.
		}
	};
})();