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
    .then(function (usersArray) {
        return usersArray.map(function (u) {
            return `<tr>
                <td>${u.id}</td>
                <td>${u.name}</td>
                <td>${u.lastname}</td>
                <td>${u.email}</td>
                <td>${u.phone}</td>
            </tr>`
        })
    })
})

console.log(users);