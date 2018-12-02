
function test(){
    testPerson();
    testCategory();
}

window.onload = test;

//Testeo clase Persona
function testPerson(){
    console.log("**TESTEO CLASE PERSONA**");
    try{
        var person1 = Person("Alejandro","Pa","Ro","19/02/98","")
    }catch(error){
        console.log("Sin llamar al new: " + error.toString());
    }

    try {
        var person1 = new Person();
    } catch (error) {
        console.log("No metiendo campos: " + error.toString());
    }

    try {
        var person1 = new Person("Alejandro","Pa","Ro","19/02/98","")
    } catch (error) {
        console.log("Sin construir una fecha: " + error.toString());
    }

    try {
        var person1 = new Person("Alejandro","Pa","Ro",new Date(1998, 06, 31),"");
        console.log(person1.toString());
    }catch(error){
        console.log(error.toString());
    }

    console.log("");
}

function testCategory(){
    console.log("**TESTEO CLASE CATEGORIA**");

    try {
        var cate1 = Category("Hola","Hi");
    } catch (error) {
        console.log("Sin llamar al new: " + error.toString());
    }

    try {
        var cate1 = new Category();
    } catch (error) {
        console.log("No metiendo campos: " + error.toString());
    }

    try {
        var cate1 = new Category("Hola","Hi");
        console.log(cate1.toString());
    } catch (error) {
        console.log(error.toString());
    }
}
