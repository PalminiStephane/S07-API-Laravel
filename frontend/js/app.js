const url = 'http://localhost:8000/api';

function initApp() {
  getTasks();

  // Je récupère le bouton pour afficher le formulaire et lui ajoute un écouteur d'évènement
  const newTaskButton = document.querySelector('.create-task-container button');
  newTaskButton.addEventListener('click', displayCreateForm);

  // On va ajouter un écouteur d'évènement sur la soumission du formulaire de création
  const newTaskForm = document.querySelector('.modal-dialog form');
  newTaskForm.addEventListener('submit', addTask);
}

initApp();
