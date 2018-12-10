function test(){
    testPerson();
    testCategory();
    testMovie();
    testSeason();
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

    try{
        var person2 = new Person("Alejan","Pa","",new Date(1998,06,31),"");
        console.log(person2.toString());
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

    console.log("");
}

function testMovie(){
    console.log("**TESTEO CLASE MOVIE**");
    try {
        var mov1 = new Movie("Hola","",new Date(2020,11,03),"","","",[]);
        console.log(mov1.toString());
    } catch (error) {
        console.log(error.toString());
    }

    console.log("");
}

function testSeason(){
    console.log("**TESTEO CLASE SEASON**");
    try {
        var sea1 = new Season("Hola",[
        {title:'Hola',episode: 'b',scenarios:[new Coordinate(12,20)]},
        {title:'Hola',episode: 'b',scenarios:[new Coordinate(21,30)]}
        ]);
    } catch (error) {
        console.log(error.toString());
    }
}

