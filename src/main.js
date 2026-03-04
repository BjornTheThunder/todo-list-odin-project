import { activeProjectId, getProjectById, projectList } from "./project.js";
import { addNewTask } from "./task.js";
import { updateUI } from "./ui.js";

const newTaskBtn = document.getElementById("new-task-button");

projectList.addEventListener("click", (event) => {
  const projectItem = event.target.closest(".project-item");

  if (projectItem) {
    activeProjectId = projectItem.getAttribute("data-id");

    updateUI();
  }
});

newTaskBtn.addEventListener('click', () => {
  addNewTask();
});

updateUI();
