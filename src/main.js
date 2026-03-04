import { activeProjectId, projectList } from "./project.js";
import { updateUI } from "./ui.js";

projectList.addEventListener("click", (event) => {
  const projectItem = event.target.closest(".project-item");

  if (projectItem) {
    activeProjectId = projectItem.getAttribute("data-id");

    updateUI();
  }
});


updateUI();
