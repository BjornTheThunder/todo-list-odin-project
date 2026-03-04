import { Item, Note, Project } from "./todo.js";
import { updateUI } from "./ui.js";

export let projects = [];
export let activeProjectId = 0;

export const projectList = document.getElementById("project-list");

// LOGIC FOR MANAGING NEW PROJECT CREATION
const addProjectBtn = document.querySelector('.add-project-btn');
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');
const saveProject = document.getElementById('saveProject');
const projectNameInput = document.getElementById('projectNameInput');
const projectDateInput = document.getElementById('projectDateInput');

addProjectBtn.addEventListener('click', () => {
  modalOverlay.classList.add('active');
  projectNameInput.focus();
});

closeModal.addEventListener('click', () => {
  modalOverlay.classList.remove('active');
  projectNameInput.value = ''; // Clear input
});

saveProject.addEventListener('click', () => {
  const name = projectNameInput.value.trim();
  const dueDate = projectDateInput.value;

  if (name && dueDate) {
    const dateObj = new Date(dueDate);

    const newProject = new Project(name, dateObj);

    projects.push(newProject);
    if (activeProjectId == 0) activeProjectId = newProject.id;

    updateUI();

    modalOverlay.classList.remove('active');
    projectNameInput.value = '';
    projectDateInput.value = '';
  } else {
    alert("Please fill in both fields!");
  }
});

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove('active');
  }
});
// ===============================================

// LOGIC FOR PROJECT DELETION
const deleteModal = document.getElementById('deleteModalOverlay');
const deleteInput = document.getElementById('deleteConfirmInput');
const confirmTextLabel = document.getElementById('confirmProjectName');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDelete = document.getElementById('cancelDelete');

function openDeleteModal() {
  const currentProject = getProjectById(activeProjectId);
  if (!currentProject) return;

  confirmTextLabel.textContent = currentProject.title;

  deleteInput.value = '';
  confirmDeleteBtn.disabled = true;
  confirmDeleteBtn.style.opacity = "0.5";

  deleteModal.classList.add('active');
}

deleteInput.addEventListener('input', (e) => {
  const targetName = confirmTextLabel.textContent;
  if (e.target.value === targetName) {
    confirmDeleteBtn.disabled = false;
    confirmDeleteBtn.style.opacity = "1";
  } else {
    confirmDeleteBtn.disabled = true;
    confirmDeleteBtn.style.opacity = "0.5";
  }
});

confirmDeleteBtn.addEventListener('click', () => {
  projects = projects.splice(activeProjectId, 1);

  activeProjectId = projects.length > 0 ? projects[0].id : 0;

  deleteModal.classList.remove('active');
  updateUI();
});

cancelDelete.addEventListener('click', () => deleteModal.classList.remove('active'));

document.getElementById('delete-project-btn').addEventListener('click', openDeleteModal);
// ==============================

//Helper to get the project by ID
export function getProjectById(id) {
  if (id < 0) {
    console.error("Cannot get project with id less than 0!");
    return;
  }

  for (let i = 0; i < projects.length; i++) {
    if (id == projects[i].id) return projects[i];
  }

  console.error("Project at the specified ID was not found!");
  return null;
}

