/*// Import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");

const fs = require("fs");

// Aplicatia
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

// Create

app.post("/conectare", (req, res) => {
  const date_conectare = req.body;
  const users = readJSONFile();
  let flag = false;
  let ok = false;
  users.forEach(element => {
      if(date_conectare.email === element.email && credentials.password === element.password){
          flag = true;
          const utiliz = element.utilizator;
      }
  });
  if (flag === true && ok === true) {
      res.status(201).send("succes");
  }
  else if(flag) {
      res.status(200).send("succes");
  }
  else{
      res.status(404).send("error");
  }
});
app.post('/creare_cont', (req, res) => {
const utilizatorNou = req.body;
    const utilizatori = readJSONFile();
    utilizatorNou.id = uuid.v4.apply();
    let flag = false;
    for (let i = 0; i < utilizatori.length; i++) {
        if (utilizatori[i].email === utilizatorNou.email) {
            flag = true;
            break;
        }
    }
    if (flag) {
        res.status(400).send("User already exists!");
    } else {
        utilizatori.push(utilizatorNou);
        writeJSONFile(null, utilizatori);
        res.status(200).send("User added!");
    }
});
/////////////////////////////////////////////////////////
app.post("/formular", (req, res) => {
  const dogsList = readJSONFile();
  // Completati cu codul vostru aici
  const newLucrare=req.body;
  if(newLucrare.nume!=undefined)
    {
      res.status(200);
    }
    else
    res.status(1000);
});
////////////////////////////////////////////////////////////////
// Read One
app.get("/formular/:id", (req, res) => {
  const dogsList = readJSONFile();
  // Completati cu codul vostru aici

});

// Read All
app.get("/", (req, res) => {
  const dogsList = readJSONFile();
  // Completati cu codul vostru aici
  if(dogsList!=undefined && dogsList.length!=0)
  {
    res.status(200).send(dogsList);

  }
});

// Update
app.put("/formular/:id", (req, res) => {
  const dogsList = readJSONFile();
  // Completati cu codul vostru aici

});

// Delete
app.delete("/formular/:id", (req, res) => {
  const dogsList = readJSONFile();
  // Completati cu codul vostru aici
});

// Functia de citire din fisierul db.json
function readJSONFile() {
  return JSON.parse(fs.readFileSync("db.json"))["formular"];
}

// Functia de scriere in fisierul db.json
function writeJSONFile(content) {
  fs.writeFileSync(
    "db.json",
    JSON.stringify({ formular: content }),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

// Pornim server-ul
app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);
*/
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
app.post("/dogs", (req, res) => {
  const dogsList = readJSONFile();
  // Fill in your code here
  const newDog = req.body;
  newDog.id = uuid.v4.apply();
  dogsList.push(newDog);
  writeJSONFile(dogsList);
  res.status(200).send(newDog);
});

// Read One
app.get("/dogs/:id", (req, res) => {
  const dogsList = readJSONFile();
  // Fill in your code here
  const id = req.params.id;
  let foundDog = null;
  dogsList.forEach(dog => {
    if (dog.id === id) {
        foundDog = dog;
    }
  })
  if (foundDog === null) {
    res.status(204).send('No dog found!');
  } else {
    res.status(200).send(foundDog);
  }
});

// Read All
app.get("/dogs", (req, res) => {
  const dogsList = readJSONFile();
  // Fill in your code here 
  if(dogsList != undefined && dogsList.length != 0) {
    res.status(200).send(dogsList);
  } else {
    res.status(204).send('No dogs found!');
  }
});

// Update
app.put("/dogs/:id", (req, res) => {
  const dogsList = readJSONFile();
  // Fill in your code here
  const id = req.params.id;
  const update = req.body;
  let dogToUpdate = null;
  for (let i = 0; i < dogsList.length; i++) {
    if (dogsList[i].id === id) {
        if (update.name) {
            dogsList[i].name = update.name;
        }

        if (update.img) {
            dogsList[i].img = update.img;
        }

        dogToUpdate = dogsList[i];
        break;
    }
  }
  writeJSONFile(dogsList);
  if (dogToUpdate === null) {
    res.status(204).send('No dog found!')
  } else {
    res.status(200).send(dogToUpdate);
  }
});

// Delete
app.delete("/dogs/:id", (req, res) => {
  const dogsList = readJSONFile();
  // Fill in your code here
  const id = req.params.id;
  let check = false;
  for(let i = 0; i < dogsList.length; i++) {
    if(dogsList[i].id === id) {
        check = true;
        dogsList.splice(i, 1);
        break;
    }
  }
  writeJSONFile(dogsList);
  if (check === true) {
    res.status(200).send('Dog deleted!');
  } else {
    res.status(204).send('No dog found!');
  }
});

// Reading function from db.json file
function readJSONFile() {
  return JSON.parse(fs.readFileSync("db.json"))["dogs"];
}

// Writing function from db.json file
function writeJSONFile(content) {
  fs.writeFileSync(
    "db.json",
    JSON.stringify({ dogs: content }, null, 4),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

// Starting the server
app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);