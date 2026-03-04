import { activeProjectId, getProjectById } from "./project.js";
import { updateUI } from "./ui.js";

const taskModal = document.getElementById('taskModalOverlay');
const taskTitle = document.getElementById('taskTitleInput');
const taskDesc = document.getElementById('taskDescInput');
const taskDate = document.getElementById('taskDateInput');
const saveTaskBtn = document.getElementById('saveTaskBtn');
const closeTaskBtn = document.getElementById('closeTaskModal');
export const newTaskBtn = document.getElementById("new-task-button");

export function addNewTask() {
  const currentProject = getProjectById(activeProjectId);
  if (!currentProject) {
    alert("Please select or create a project first!");
    return;
  }
  document.getElementById('targetProjectName').textContent = currentProject.title;
  taskModal.classList.add('active');
}

saveTaskBtn.addEventListener('click', () => {
  const title = taskTitle.value.trim();
  const desc = taskDesc.value.trim();
  const date = taskDate.value;

  if (title && desc && date) {
    const currentProject = getProjectById(activeProjectId);

    const newTask = {
      title: title,
      description: desc,
      dueDate: date,
      notes: []
    };

    currentProject.items.push(newTask);

    updateUI();

    taskModal.classList.remove('active');
    [taskTitle, taskDesc, taskDate].forEach(el => el.value = '');
  } else {
    alert("Please fill in all fields to create a task.");
  }
});

closeTaskBtn.addEventListener('click', () => {
  taskModal.classList.remove('active');
});


export function removeTaskFromData(title) {
  const currentProject = getProjectById(activeProjectId);

  currentProject.items = currentProject.items.filter(item => item.title !== title);

  updateUI();
}
