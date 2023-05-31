// Import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");

const fs = require("fs");

// Application
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

// Create
app.post("/projects", (req, res) => {
  const projectsList = readJSONFile();
  const newProject = req.body;
  newProject.id = uuid.v4();
  projectsList.push(newProject);
  writeJSONFile({ projects: projectsList });
  res.status(200).send(newProject);
});

// Read One
app.get("/projects/:id", (req, res) => {
  const projectsList = readJSONFile();
  const id = req.params.id;
  const foundProject = projectsList.find(project => project.id === id);
  if (foundProject) {
    res.status(200).send(foundProject);
  } else {
    res.status(204).send('No project found!');
  }
});

// Read All
app.get("/projects", (req, res) => {
  const projectsList = readJSONFile();
  if (projectsList && projectsList.length > 0) {
    res.status(200).send(projectsList);
  } else {
    res.status(204).send('No projects found!');
  }
});

// Update
app.put("/projects/:id", (req, res) => {
  const projectsList = readJSONFile();
  const id = req.params.id;
  const update = req.body;
  let projectToUpdate = null;
  for (let i = 0; i < projectsList.length; i++) {
    if (projectsList[i].id == id) {
      if (update.name) {
        projectsList[i].name = update.name;
      }
      if (update.img) {
        projectsList[i].img = update.img;
      }
      projectToUpdate = projectsList[i];
      break;
    }
  }
  writeJSONFile({ projects: projectsList });
  if (projectToUpdate) {
    res.status(200).send(projectToUpdate);
  } else {
    res.status(204).send('No project found!');
  }
});

// Delete
app.delete("/projects/:id", (req, res) => {
  const projectsList = readJSONFile();
  const id = req.params.id;
  const projectIndex = projectsList.findIndex(project => project.id === id);
  if (projectIndex !== -1) {
    projectsList.splice(projectIndex, 1);
    writeJSONFile({ projects: projectsList });
    res.status(200).send('Project deleted!');
  } else {
    res.status(204).send('No project found!');
  }
});

// Reading function from db.json file
function readJSONFile() {
  const content = fs.readFileSync("db.json", "utf8");
  return JSON.parse(content).projects;
}

// Writing function to db.json file
function writeJSONFile(content) {
  fs.writeFileSync("db.json", JSON.stringify(content, null, 4), "utf8", err => {
    if (err) {
      console.log(err);
    }
  });
}

// Starting the server
app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);
