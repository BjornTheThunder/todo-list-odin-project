import { projects, projectList, activeProjectId, getProjectById } from "./project.js";
import { removeTaskFromData } from "./task.js";

const todoItem = document.getElementById("todo-items");
const contentHeader = document.getElementById(("content-header"));

export function updateUI() {
  updateProjects();
  updateItems();
}

function updateProjects() {
  if (projects.length < 1) {
    projectList.innerHTML = "";
    contentHeader.style.display = "none";
    return;
  }

  const projectsHTML = projects.map(project => {
    project.isActive = (project.id == activeProjectId);

    return `
    <div data-id="${project.id}" class="project-item ${project.isActive ? 'active' : ''}">
        <div class="project-info">
            <span class="project-title">${project.title}</span>
            <span class="project-date">Due: ${project.dueDate}</span>
        </div>
    </div>
  `;
  }).join("");

  projectList.innerHTML = projectsHTML;
  if (projects.length >= 1) contentHeader.style.display = "flex";
  document.getElementById("selected-project-title").innerHTML = getProjectById(activeProjectId).title;
}

function updateItems() {
  if (projects.length < 1) {
    todoItem.innerHTML = `
      <div class="empty-state">
        <span class="material-icons">assignment_late</span>
        <p>Nothing to show here... Start by creating a new project!</p>
      </div>
    `;
    return;
  }

  const currentProject = getProjectById(activeProjectId);

  const itemsHTML = currentProject.items.map(item => {
    // Generate the notes HTML for this specific item
    const notesHTML = item.notes.map(note => `
      <div class="note-item">
        <p>${note.content}</p>
        <span class="note-date">Added on ${note.insertionDate}</span>
      </div>
    `).join("");

    return `
    <article class="todo-card">
      <div class="todo-card-header">
        <div class="header-text-group">
            <h3>${item.title}</h3>
            <span class="chip">Due: ${item.dueDate}</span>
        </div>
        <button class="btn-icon-delete" title="Delete Task">
            <span class="material-icons">delete_outline</span>
        </button>
      </div>
      
      <p class="todo-description">${item.description}</p>
      
      <div class="todo-notes">
        <h4>Notes</h4>
        ${notesHTML || '<p class="note-date">No notes yet.</p>'}
      </div>
    </article>
    `;
  }).join("");

  todoItem.innerHTML = itemsHTML;
}

todoItem.addEventListener('click', async (e) => {
  const deleteBtn = e.target.closest('.btn-icon-delete');

  if (deleteBtn) {
    const card = deleteBtn.closest('.todo-card');
    const taskTitle = card.querySelector('h3').textContent;

    const confirmed = await customConfirm(
      "Delete Task",
      `Are you sure you want to permanently remove "${taskTitle}"?`
    );

    if (confirmed) {
      removeTaskFromData(taskTitle);
    }
  }
});

const confirmModal = document.getElementById('confirmModalOverlay');
const confirmExecuteBtn = document.getElementById('confirmExecuteBtn');
const confirmCancelBtn = document.getElementById('confirmCancelBtn');

export function customConfirm(title, message) {
  return new Promise((resolve) => {
    document.getElementById('confirmTitle').textContent = title;
    document.getElementById('confirmMessage').textContent = message;

    confirmModal.classList.add('active');

    const handleConfirm = () => {
      cleanup();
      resolve(true);
    };

    const handleCancel = () => {
      cleanup();
      resolve(false);
    };

    const cleanup = () => {
      confirmModal.classList.remove('active');
      confirmExecuteBtn.removeEventListener('click', handleConfirm);
      confirmCancelBtn.removeEventListener('click', handleCancel);
    };

    confirmExecuteBtn.addEventListener('click', handleConfirm);
    confirmCancelBtn.addEventListener('click', handleCancel);
  });
}
