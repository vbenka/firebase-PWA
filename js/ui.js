const users = document.querySelector('.list-group');

const renderUsers = (id, data) => {
  const html = `
    <li class="list-group-item" data-id="${id}">
      <span class="first-name">${data.name}</span> <span class="last-name">${data.lastname}</span>
      <button type="button" class="btn-sm btn btn-danger btn-x" onClick="deleteUser(event)">Delete</button>
      <button type="button" class="btn-sm btn btn-secondary btn-x" onClick="showUserModal(event)">Edit</button>
    </li>
  `;

  users.innerHTML += html;
}

// remove user from DOM
const removeUser = id => {
  const user = document.querySelector(`.list-group-item[data-id=${id}]`);
  user.remove();
}

// modified user
const modifiedUser = (id, data) => {
  const user = document.querySelector(`.list-group-item[data-id=${id}]`);
  const firstName = user.querySelector('.first-name');
  const lastName = user.querySelector('.last-name');
  firstName.innerHTML = data.name;
  lastName.innerHTML = data.lastname;

  hideUserModal();
}

const registerUserModal = () => {
  $('#userModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  });
}


// show user modal for new and edit
const showUserModal = e => {
  let id;
  let firstName;
  let lastName;

  if(e) {
    id = e.currentTarget.parentNode.getAttribute('data-id');
    const user = document.querySelector(`.list-group-item[data-id=${id}]`);
    firstName = user.querySelector('.first-name').innerHTML;
    lastName = user.querySelector('.last-name').innerHTML;
  }else {
    id = 0;
    firstName = '';
    lastName = '';
  }

  const form = document.querySelector('form');
  form.firstname.value = firstName
  form.lastname.value = lastName;
  form.setAttribute('data-id', id);
  
  $('#userModal').modal('show');
}

// hide user modal
const hideUserModal = () => {
  $('#userModal').modal('hide');
}