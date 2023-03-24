
function insertTaskInDOM(task) {
  // task = {id: 1, title: 'Ranger les courses'}
  // <li data-id="0">
  //   <p>sortir les poubelles</p>
  //   <div class="delete"></div>
  //   <div class="edit"></div>
  // </li>
  const taskList = document.querySelector('.tasklist');

  // <li data-id="0"></li>
  const taskElement = document.createElement('li');
  taskElement.dataset.id = task.id; // data-id="1"

  // <p>sortir les poubelles</p>
  const titleElement = document.createElement('p');
  titleElement.textContent = task.title;
  taskElement.append(titleElement);

  // <div class="delete"></div>
  const deleteButton = document.createElement('div');
  deleteButton.className = 'delete';
  // On ajoute un écouteur d'évènement sur le bouton delete
  deleteButton.addEventListener('click', removeTask);
  taskElement.append(deleteButton); // On ajoute la div.delete à notre <li>

  // <div class="edit"></div>
  const editButton = document.createElement('div');
  editButton.className = 'edit';
  // On ajoute un écouteur d'évènement sur le bouton edit
  editButton.addEventListener('click', displayEditForm);
  taskElement.append(editButton); // On ajoute la div.edit à notre <li>

  taskList.append(taskElement);  // On ajoute <li> à notre <ul>
}

function updateTaskInDOM(task) {
  const taskList = document.querySelector('.tasklist');

  const taskElement = taskList.querySelector(`[data-id='${task.id}']`);

  taskElement.querySelector('p').textContent = task.title;
}

function removeTaskInDOM(task) {
  // On supprime le <li> du bouton de suppression sur lequel on a cliqué
  task.remove();
}

function displayCreateForm() {
  handleForm();
}

function displayEditForm(event) {
  const taskElement = event.target.closest('li');
  const id = taskElement.dataset.id;
  const title = taskElement.querySelector('p').textContent;

  handleForm(id, title);
}

function handleForm(id = '', title = '') {
  const modalElement = document.querySelector('.modal-dialog');

  modalElement.querySelector('#task-id').value = id;
  modalElement.querySelector('#task-title').value = title;

  if (id) { // En cas de mise à jour
    modalElement.querySelector('h2').textContent = 'modifier une tâche';
    modalElement.querySelector('button').textContent = 'Modifier';
  }

  modalElement.classList.add('show');
}

function hideCreateForm() {
  // Je commence par recacher le formulaire de création
  const modalElement = document.querySelector('.modal-dialog');
  modalElement.classList.remove('show');
}

function showMessage(message, isError = false) {
  // Si on veut afficher une erreur, on récupère .message.danger, sinon .message.success
  const messageElement = isError ? document.querySelector('.message.danger') : document.querySelector('.message.success');
  messageElement.textContent = message;
  messageElement.removeAttribute('hidden');
  // La fonction en 1er argument va être exécuté après le temps indiqué en 2nd argument (temps en ms)
  setTimeout(function () {
    messageElement.setAttribute('hidden', '');
  }, 3000);
}
