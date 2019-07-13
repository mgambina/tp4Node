//aca van todos los fetch
let users = [];

fetch("http://localhost:4000/api/users")
    .then(function (res) {
        return res.json();
    })
    .then(usersApi => {

        usersApi.forEach(user => {
            users.push(user);
        })
    })
    .then(function () {

        let htmlMap = users.map(function (u) {
            return `<tr>
                <td>${u.id}</td>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>${u.address}</td>
                <td>${u.phone}</td>
            </tr>`
        })

        return htmlMap;
    })
    .then(function (htmlMap) {

        const tableUsers = document.getElementById("tableBodyUsers");

        tableUsers.innerHTML = htmlMap.join("");

    })

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

    fetch(`http://localhost:4000/api/users`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-Type": "application/json"
        }

    })
}