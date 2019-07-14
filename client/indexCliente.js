function createUser(u) {
    return `<tr>
        <td>${u.id}</td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.address}</td>
        <td>${u.phone}</td>
    </tr>`

}

fetch("http://localhost:4000/api/users")
    .then(function (res) {
        return res.json();
    })
    .then(usersApi => {
        createUsersTable(usersApi);
    });

function validate(newUserInfo) {

    let resultValidationClient = {
        valid: true,
        message: ""
    }

    const expression = /\S+@\S+/
    if (expression.test(String(newUserInfo.email).toLowerCase())) {

    } else {
        resultValidationClient.valid = false;
        resultValidationClient.message = resultValidationClient.message.concat("Invalid email");

    }

    if (typeof (newUserInfo.phone) != "number") {
        resultValidationClient.valid = false;
        resultValidationClient.message = resultValidationClient.message.concat("Phone should be only numbers");
    }

    return resultValidationClient;
}

document.getElementById("btnAddUser").onclick = function () {
    const name = document.getElementById("exampleInputName").value;
    const email = document.getElementById("exampleInputEmail").value;
    const address = document.getElementById("exampleInputAddress").value;
    const phone = document.getElementById("exampleInputPhone").value;

    const newUser = {
        name: name,
        email: email,
        address: address,
        phone: parseInt(phone)
    }

    let resultValidationClient = validate(newUser);

    if (resultValidationClient.valid) {
        let resultadoPost = false;

        fetch(`http://localhost:4000/api/users`, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json"
            }

        }).then(function (res) {
            resultadoPost = res.ok
            return res.json();
        }).then(function (jsonServer) {
            if (!resultadoPost) {
                alert(jsonServer.message)
            }
            else {                
                const userHtml = createUser(jsonServer);
                const tableUsers = document.getElementById("tableBodyUsers");

                tableUsers.innerHTML += userHtml;

                const formUsers = document.getElementById("formUsers");
                formUsers.reset();

                $('#exampleModal').modal('hide');
        

            }
        })
    } else {
        alert(resultValidationClient.message)
    }

}

function filter () {
    var input = document.getElementById("input");

    fetch(`http://localhost:4000/api/users?search=${input.value}`)
    .then(function (res) {
        return res.json();
    })
    .then(usersApi => {
        createUsersTable(usersApi);
    });

}

function createUsersTable(usersJson){

    users = [];
    usersJson.forEach(user => {
        users.push(user);
    })

    let htmlMap = users.map(function (u) {
        return createUser(u)
    })

    const tableUsers = document.getElementById("tableBodyUsers");

    tableUsers.innerHTML = htmlMap.join("");
        
}