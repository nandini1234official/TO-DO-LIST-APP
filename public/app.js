let tasks = [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const dueDateInput = document.getElementById('dueDate');

  if (taskInput.value !== '') {
    const task = {
      id: Date.now(),
      text: taskInput.value,
      dueDate: dueDateInput.value || 'No due date',
      completed: false
    };
    tasks.push(task);
    updateTaskList();
    taskInput.value = '';
    dueDateInput.value = '';
  }
}

function removeTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  updateTaskList();
}

function updateTaskList() {
  const taskList = document.getElementById('taskList');
  const progress = document.getElementById('progressTracker');
  taskList.innerHTML = '';

  let completedCount = 0;
  const today = new Date().toISOString().split('T')[0]; // format: YYYY-MM-DD

  tasks.forEach(task => {
    const li = document.createElement('li');
    const span = document.createElement('span');

    let overdueText = '';
    if (!task.completed && task.dueDate !== 'No due date' && task.dueDate < today) {
      overdueText = ' ⚠ Overdue!';
      span.classList.add('overdue');
    }

    span.textContent = (task.completed ? '✔ ' : '') + task.text + ' (Due: ' + task.dueDate + ')' + overdueText;

    if (task.completed) {
      span.classList.add('completed');
      completedCount++;
    }

    span.addEventListener('click', () => {
      task.completed = !task.completed;
      updateTaskList();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => removeTask(task.id);

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  const total = tasks.length;
  const pending = total - completedCount;
  progress.innerHTML = `
    <p>Total Tasks: ${total}</p>
    <p>Completed: ${completedCount}</p>
    <p>Pending: ${pending}</p>
  `;
}