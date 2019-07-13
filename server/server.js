const express = require("express");
const cors = require("cors");

//aca van todos los app.get/ app.post etc

const users = [
    {id: 1, name: "Bruce Wayne", email: "bruce@wayneenterpreises.com", address:"Gotham City", phone: 08009991111},
    {id: 2, name: "Harry Potter", email: "harry.potter@howagarts.com", address:"Howarts", phone: 08009992222},
    {id: 3, name: "Hermione Granger", email: "hermione.granger@howagarts.com", address:"Howarts", phone: 08009993333},

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


app.post("/api/users", function (req, res) {

    const newUser = req.body;

    newUser.id = ++ID;
    
    users.push(newUser);
    // if (!nuevoTodo.texto || nuevoTodo.texto.trim().length === 0) {
    //     //si quiero cortar la ejecucion porque no esta bien uso un return ademas de un res par avisarle al usuario
    //     return res.status(400).send("salió todo mal");
    // }
  
    res.json(newUser);

    console.log(users);

});



app.listen(4000);