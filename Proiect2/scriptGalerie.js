// Fetch the project data from the server
function readProjects() {
    fetch("http://localhost:3000/projects")
      .then(response => response.json())
      .then(projects => {
        // Update the project gallery on the page
        const projectGalleryElement = document.getElementById("projectGallery");
        projectGalleryElement.innerHTML = "";
        if (projects.length > 0) {
          projects.forEach(project => {
            const image = document.createElement("img");
            image.src = project.img;
            image.alt = project.name;
            projectGalleryElement.appendChild(image);
          });
        } else {
          const message = document.createElement("p");
          message.textContent = "Nu există poze introduse.";
          projectGalleryElement.appendChild(message);
        }
      })
      .catch(error => {
        console.error("Error fetching project data:", error);
      });
  }

  function createProject() {
    const name = prompt("Introdu numele proiectului:");
    const img = prompt("Introdu URL-ul imaginii:");

    if (name && img) {
      fetch("http://localhost:3000/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, img })
      })
        .then(response => response.json())
        .then(newProject => {
          console.log("Created project:", newProject);
          readProjects();
        })
        .catch(error => {
          console.error("Error creating project:", error);
        });
    }
  }

  function updateProject() {
    const id = prompt("Introdu ID-ul pozei pe care vrei să o schimbi:");
    const name = prompt("Introdu noul nume:");
    const img = prompt("Introdu URL-ul nou al pozei:");

    if (id && (name || img)) {
      fetch(`http://localhost:3000/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, img })
      })
        .then(response => response.json())
        .then(updatedProject => {
          console.log("Updated project:", updatedProject);
          readProjects();
        })
        .catch(error => {
          console.error("Error updating project:", error);
        });
    }
  }

  function deleteProject() {
    const id = prompt("Introdu ID-ulpozei pe care vrei să o ștergi:");

    if (id) {
      fetch(`http://localhost:3000/projects/${id}`, {
        method: "DELETE"
      })
        .then(response => response.text())
        .then(message => {
          console.log("Delete response:", message);
          readProjects();
        })
        .catch(error => {
          console.error("Error deleting project:", error);
        });
    }
  }