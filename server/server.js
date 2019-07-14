const express = require("express");
const cors = require("cors");

//aca van todos los app.get/ app.post etc

const users = [
    {id: 1, name: "Bruce Wayne", email: "bruce@wayneenterpreises.com", address:"Gotham City", phone: 08009991111},
    {id: 2, name: "Harry Potter", email: "harry.potter@hogwagarts.com", address:"Hogwarts", phone: 08009992222},
    {id: 3, name: "Hermione Granger", email: "hermione.granger@hogwagarts.com", address:"Hogwarts", phone: 08009993333},

]

let ID = 3;

//crear el servidor de express
const app = express();

//configuro la validacion --> esta abierta para todo el mundo porque no especifique nada
app.use(cors());

//si lo que me llega si bien es un string, lo transformo en un objeto.
app.use(express.json());

app.get("/api/users", function (req, res) {
    //res.send(tareas);
    res.json(users);
});



function validate (newUserInfo) {

    let resultValidation = {
        valid: true,
        message: ""
    }

    if(newUserInfo.name.length > 30) {
        resultValidation.valid = false;
        resultValidation.message = resultValidation.message.concat("Invalid name length");
    } 

    const expression = /\S+@\S+/
    if(expression.test(String(newUserInfo.email).toLowerCase())) {

    } else {
        resultValidation.valid = false;
        resultValidation.message = resultValidation.message.concat("Invalid email");
        
    }

    if (typeof(newUserInfo.phone)!= "number") {
        resultValidation.valid = false;
        resultValidation.message = resultValidation.message.concat("Phone should be only numbers");
    }

    return resultValidation;
}

app.post("/api/users", function (req, res) {

    const newUser = req.body;

    let resultValidation = validate(newUser); 

    if (!resultValidation.valid) {
        return res.status(400).json({message: resultValidation.message});

    } else {
        newUser.id = ++ID;
    
        users.push(newUser);
       
        res.json(newUser);
    }

    console.log(users);

});



app.listen(4000);