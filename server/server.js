const express = require("express");
const cors = require("cors");

//aca van todos los app.get/ app.post etc

const users = [
    { id: 1, name: "Bruce Wayne", email: "bruce@wayneenterpreises.com", address: "Gotham City", phone: 08009991111 },
    { id: 2, name: "Harry Potter", email: "harry.potter@hogwagarts.com", address: "Hogwarts", phone: 08009992222 },
    { id: 3, name: "Hermione Granger", email: "hermione.granger@hogwagarts.com", address: "Hogwarts", phone: 08009993333 },

]

let ID = 3;

//crear el servidor de express
const app = express();

//configuro la validacion --> esta abierta para todo el mundo porque no especifique nada
app.use(cors());

//si lo que me llega si bien es un string, lo transformo en un objeto.
app.use(express.json());

function serverFilter(searchFilter) {
    if (!searchFilter) {
        return users
    } else {
        let filterUsers = [];

        for (let i = 0; i < users.length; i++) {
            if (users[i].name.includes(searchFilter)) {
                filterUsers.push(users[i])
            } else if (users[i].email.includes(searchFilter)) {
                filterUsers.push(users[i])
            } else if (users[i].phone.toString().includes(searchFilter)) {
                filterUsers.push(users[i])
            } else if (users[i].address.includes(searchFilter)) {
                filterUsers.push(users[i])
            }
        }

        return filterUsers;
    }
}

app.get("/api/users", function (req, res) {
    let searchFilter = req.query.search
    res.json(serverFilter(searchFilter));
});

function validate(newUserInfo) {

    let resultValidation = {
        valid: true,
        message: ""
    }

    if (newUserInfo.name.length > 30) {
        resultValidation.valid = false;
        resultValidation.message = resultValidation.message.concat("Invalid name length");
    }

    const expression = /\S+@\S+/
    if (expression.test(String(newUserInfo.email).toLowerCase())) {

    } else {
        resultValidation.valid = false;
        resultValidation.message = resultValidation.message.concat("Invalid email");

    }

    if (typeof (newUserInfo.phone) != "number") {
        resultValidation.valid = false;
        resultValidation.message = resultValidation.message.concat("Phone should be only numbers");
    }

    return resultValidation;
}

app.post("/api/users", function (req, res) {

    const newUser = req.body;

    let resultValidation = validate(newUser);

    if (!resultValidation.valid) {
        return res.status(400).json({ message: resultValidation.message });

    } else {
        newUser.id = ++ID;

        users.push(newUser);

        res.json(newUser);
    }

    console.log(users);

});

app.delete("/api/users/:id", function (req, res) {

    const id = parseInt(req.params.id)

     for (let i =0; i < users.length; i++) {

        if (users[i].id === id) {
           
            users.splice(i, 1);
        }
    }

    res.json(users)

});

app.put("/api/users/:id", function (req, res){
    //para obtener el id de la tarea a editar
    const userId = req.params.id;
    const userEditado = req.body; 

    let resultValidation = validate(userEditado);

    if (!resultValidation.valid) {
        return res.status(400).json({ message: resultValidation.message });
    }
   
    users.forEach(function (user) {
        if(userId == user.id) {
           user.name = userEditado.name;
           user.address = userEditado.address;
           user.email = userEditado.email;
           user.phone = userEditado.phone;
           //una vez que editamos lo que queriamos editar, nos vamos y devolvemos el objeto editado
           return res.json(user)
        }
    })
})

app.listen(4000);