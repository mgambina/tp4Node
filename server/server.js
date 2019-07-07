const express = require("express");
const cors = require("cors");

//aca van todos los app.get/ app.post etc

const users = [
    {id: 1, name: "Bruce", lastname: "Wayne", email: "bruce@wayneenterpreises.com", phone: 08009991111},
    {id: 2, name: "Harry", lastname: "Potter", email: "harry.potter@howagarts.com", phone: 08009992222},
    {id: 3, name: "Hermione", lastname: "Granger", email: "hermione.granger@howagarts.com", phone: 08009993333},

]

let ID = 3;

//crear el servidor de express
const app = express();

//configuro la validacion --> esta abierta para todo el mundo porque no especifique nada
app.use(cors());

app.get("/api/users", function (req, res) {
    //res.send(tareas);
    res.json(users);
});

//si lo que me llega si bien es un string, lo transformo en un objeto.
app.use(express.json());



app.listen(4000);