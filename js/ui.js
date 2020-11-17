const contacts = document.querySelector('.contacts')
console.log('contacts', contacts)
document.addEventListener('DOMContentLoaded', function () {
    var sidenav = document.querySelectorAll('.sidenav');
    var modals = document.querySelectorAll('.modal');
    var fab = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(fab);
    M.Sidenav.init(sidenav);
    M.Modal.init(modals);
});

const renderContacts = (data, id) => {
    const html = `<li class="collection-item contact avatar" data-id=${id}>
    <img src="${data.avatar}" alt="" class="circle">
    Name:<span class="name">${data.first_name} ${data.last_name}</span>
    <p>Email :<span class="email">${data.email}</span>
    </p>
    
</li>`;
    contacts.innerHTML += html
}

const removeContact = (id) => {
    const contact = document.querySelector(`.contact[data-id=${id}`);
    contact.remove();
}
const updateContact = (data, id) => {
    const contact = document.querySelector(`.contact[data-id="${id}"`);
    contact.querySelector('.name').innerHTML = data.name;
    contact.querySelector('.phone').innerHTML = data.phone;
    contact.querySelectorAll('.material-icons')[1].textContent = data.favorite ? 'star' : 'star_border';


}