db.enablePersistence().catch(err => {
    if (err.code == 'failed-precondition') {
        console.log('multiple tabs opened')
    } else if (err.code == 'unimplemented') {
        console.log('browser not support')
    }
})
const contactform = document.querySelector('.add-contact form');
const addContactModal = document.querySelector('#add_contact_modal');
contactform.addEventListener('submit', e => {
    e.preventDefault();
    const contact = {
        name: contactform.name.value,
        phone: contactform.phone.value,
        favorite: false
    }
    db.collection('contacts').add(contact).then(() => {
        contactform.reset();
        var instance = M.Modal.getInstance(addContactModal);
        instance.close();
        contactform.querySelector('.error').textContent = '';
    }).catch(err => {
        contactform.querySelector('.error').textContent = err.message
    })
})

db.collection('contacts').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            // console.log(`${change.doc.id} is added`)
            renderContacts(change.doc.data(), change.doc.id)
        }
        if (change.type === 'removed') {
            // console.log(`${change.doc.id} is removed`)
            removeContacts(change.doc.id);
        }
    })
})


const contactContainer = document.querySelector('.contacts');
contactContainer.addEventListener('click', e => {
    console.log('e.target.textContent', e.target.textContent);
    if (e.target.textContent === 'delete_outline') {
        const id = e.target.parentElement.getAttribute('data-id');
        db.collection('contacts').doc(id).delete()
    }
})