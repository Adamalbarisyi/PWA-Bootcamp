const contacts = document.querySelector('.contacts')
console.log('contacts', contacts)

document.addEventListener('DOMContentLoaded', function() {
    var sidenav = document.querySelectorAll('.sidenav');
    var modals = document.querySelectorAll('.modal');
    var fab = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(fab);
    M.Sidenav.init(sidenav);
    M.Modal.init(modals);
});

const renderContacts = (data, id) => {
    const html = `<li class="collection-item contact avatar" data-id=${id}>
    Name :<span class="name">${data.name}</span>
    <p>Phone num : <span class="phone">${data.phone}</span>
    </p>
    <div href="#!" class="secondary-content" data-id=${id} style="text-align:right;">
        <i class="material-icons modal-trigger" style="cursor: pointer;" href="#edit_contact_modal">edit</i>
        <i class="material-icons" style="cursor: pointer;">${data.favorite ? 'star':'star_border'}</i>
        <i class="material-icons" style="cursor: pointer;">delete_outline</i>
    </div>
</li>`;

    contacts.innerHTML += html
}

const removeContacts = (id) => {
    const contact = document.querySelector(`.contact[data-id=${id}]`);
    contact.remove();
}