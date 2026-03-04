import { projects, projectList, activeProjectId, getProjectById } from "./project.js";

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
        <h3>${item.title}</h3>
        <span class="chip">Due date: ${item.dueDate}</span>
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

