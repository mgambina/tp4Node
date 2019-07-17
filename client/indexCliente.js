function createUser(u) {
    return `<tr id="row${u.id}">
        <td id="row${u.id}" class="checkbox"><label><input type="checkbox" value=""></label></td>
        <td class="userName">${u.name}</td>
        <td class="userEmail">${u.email}</td>
        <td class="userAddress">${u.address}</td>
        <td class="userPhone">${u.phone}</td>
        <td>
            <div id="icons">
            <button id="btnEditRecord" onclick="modalEditar(${u.id}, this)"><i class="material-icons" title="Edit">&#xE254;</i></button>
            <button id="btnDeleteRecord" onclick="modalEliminar(${u.id}, this)"><i class="material-icons" title="Delete">&#xE872;</i></button>
            </div>
        </td>
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

document.getElementById("btnNewUser").onclick = function () {
    $('#exampleModal').modal('show');
    const botonAddEditarModal = document.getElementById("btnEditedUser");
    const botonAddUserModal = document.getElementById("btnAddUser");

    botonAddUserModal.classList.remove("d-none");
    botonAddEditarModal.classList.add("d-none");
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

function modalEditar(id, button) {

     users.forEach(user => {
       if (user.id === id) {

            $('#exampleModal').modal('show');

            //para ver la info que estaba cargada en ese usuario
            document.getElementById("exampleInputName").value = user.name;
            document.getElementById("exampleInputEmail").value = user.email;
            document.getElementById("exampleInputAddress").value = user.address;
            document.getElementById("exampleInputPhone").value = user.phone;

            const botonAddEditarModal = document.getElementById("btnEditedUser");
            const botonAddUserModal = document.getElementById("btnAddUser");

            botonAddEditarModal.classList.remove("d-none");
            botonAddUserModal.classList.add("d-none");


            botonAddEditarModal.onclick = function () {

                //cambia los valores
                const name = document.getElementById("exampleInputName").value;
                const email = document.getElementById("exampleInputEmail").value;
                const address = document.getElementById("exampleInputAddress").value;
                const phone = document.getElementById("exampleInputPhone").value;


                const user = {
                    name: name,
                    email: email,
                    address: address,
                    phone: phone,
                };

                fetch(`http://localhost:4000/api/users/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(user),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(data => {

                        document.querySelector(`#row${id} td.userName`).innerText = user.name;
                        document.querySelector(`#row${id} td.userEmail`).innerText = user.email;
                        document.querySelector(`#row${id} td.userAddress`).innerText = user.address;
                        document.querySelector(`#row${id} td.userPhone`).innerText = user.phone;

                        const formUsers = document.getElementById("formUsers");
                        formUsers.reset();

                        $('#exampleModal').modal('hide');
                    })

    
            }


        }

    })

 }


function modalEliminar(id, button) {

    users.forEach(user => {
        if (user.id === id) {

            $('#modalEliminar').modal('show');

            const botonDeleteModal = document.getElementById("btnDeleteModal");

            botonDeleteModal.onclick = function () {

                fetch(`http://localhost:4000/api/users/${id}`, {
                    //el metodo delete no tiene body
                    method: "DELETE",
                }).then(res => {
                    document.getElementById(`row${id}`).remove();
                })

                $('#modalEliminar').modal('hide');

            }

        }
    })
}


function filter() {
    var input = document.getElementById("input");

    fetch(`http://localhost:4000/api/users?search=${input.value}`)
        .then(function (res) {
            return res.json();
        })
        .then(usersApi => {
            createUsersTable(usersApi);
        });

}

function createUsersTable(usersJson) {

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