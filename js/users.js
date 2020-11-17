fetch('https://reqres.in/api/users')
    .then(function (res) {
        return res.json()
    })
    .then(function (res) {
        const users = res.data;
        users.forEach(user => {
            renderContacts(user, user.id);
        });
    })