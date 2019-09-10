// offline data
db.enablePersistence()
  .catch(err => {
    if(err.code == 'failed-precondition') {
      // probably multiple tabs open at once
      console.log('persistence faild')
    }else if(err.code == 'unimplemented') {
      // lack of browser support
      console.log('persistence is not implemented')
    }
  })

// real-time listener
db.collection('users').onSnapshot((snapshot) => {
  snapshot.docChanges().forEach(el => {
    if (el.type === 'added') {
      renderUsers(el.doc.id, el.doc.data());
    }
    if (el.type === 'removed') {
      removeUser(el.doc.id);
    }
    if (el.type === 'modified') {
      modifiedUser(el.doc.id, el.doc.data());
    }
  });
});

// add edit user
const addEditUser = e => {
  e.preventDefault();
  const form = e.currentTarget;
  const user = {
    name: form.firstname.value,
    lastname: form.lastname.value
  }

  const id = form.getAttribute('data-id');

  if(!id || id === '0') {
    db.collection('users').add(user)
      .catch(err => { console.error(err); });
  }else {
    db.collection('users').doc(id).update(user)
      .catch(err => { console.error(err); });
  }
  
  hideUserModal();
}

// delete user
const deleteUser = e => {
  const id = e.currentTarget.parentNode.getAttribute('data-id');

  console.log( id )
  db.collection('users').doc(id).delete();
}