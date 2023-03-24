
async function getTasks() {
  const req = await fetch(`${url}/tasks`);
  const tasks = await req.json();

  tasks.forEach(function (task) {
    insertTaskInDOM(task);
  });

  // tasks.forEach(task => insertTaskInDOM(task));
}

async function removeTask(event) {
  // On récupère le <li> le plus proche du bouton delete qui a été cliqué
  const taskElement = event.currentTarget.closest('li');
  // On récupère la valeur de data-id
  const id = taskElement.dataset.id;

  const req = await fetch(`${url}/tasks/${id}`, {
    method: 'DELETE'
  });

  // Si je récupère une réponse avec un code 200, tout s'est bien déroulé
  if (req.status === 200) {
    removeTaskInDOM(taskElement);
  } else {
    console.log('Erreur lors de la suppression');
  }
}

async function addTask(event) {
  // On empêche le comportement par défaut (soumission du formulaire)
  event.preventDefault();

  // J'extrais les données du formulaire de création
  const formData = new FormData(event.currentTarget); // event.currentTarget = <form>
  // On récupère la valeur du champ avec le name "title"
  const title = formData.get('title');
  // On récupère la valeur du champ avec le name "id" pour savoir s'il contient quelque chose (oui = mise à jour, non = création)
  const id = formData.get('id');

  if (id) { // Mise à jour d'une tâche
    const req = await fetch(`${url}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title
      })
    });

    if (req.status === 200) { // 200 OK
      const task = await req.json(); // On extrait la tâche créée de la réponse
      updateTaskInDOM(task); // On vient l'insérer dans notre liste de tâches

      hideCreateForm(); // On recache le formulaire de création
      showMessage('la tâche a été mise à jour'); // On montre un message de confirmation pendant 3 secondes
    } else {
      showMessage('oops, impossible de modifier la tâche', true); // on montre un message d'erreur pendant 3 secondes
    }
  } else { // Création d'une tâche
    const req = await fetch(`${url}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title
      })
    });

    if (req.status === 201) { // 201 Created
      const task = await req.json(); // On extrait la tâche créée de la réponse
      insertTaskInDOM(task); // On vient l'insérer dans notre liste de tâches

      hideCreateForm(); // On recache le formulaire de création
      showMessage('la nouvelle tâche a bien été ajoutée'); // On montre un message de confirmation pendant 3 secondes
    } else {
      showMessage('oops, impossible de sauvegarder la tâche', true); // on montre un message d'erreur pendant 3 secondes
    }
  }
}
