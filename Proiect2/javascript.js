const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());

// Endpoint pentru citirea datelor
app.get('/api/gallery', (req, res) => {
  // Citirea datelor dintr-un fișier JSON
  fs.readFile('gallery.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }

    const gallery = JSON.parse(data);
    res.json(gallery);
  });
});

// Endpoint pentru crearea unui element nou
app.post('/api/gallery', (req, res) => {
  const newItem = req.body;

  // Citirea datelor existente din fișierul JSON
  fs.readFile('gallery.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }

    const gallery = JSON.parse(data);

    // Generarea unui ID unic pentru noul element
    const newId = gallery.length > 0 ? gallery[gallery.length - 1].id + 1 : 1;
    newItem.id = newId;

    // Adăugarea noului element în galerie
    gallery.push(newItem);

    // Salvarea datelor actualizate în fișierul JSON
    fs.writeFile('gallery.json', JSON.stringify(gallery), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
        return;
      }

      res.json(newItem);
    });
  });
});

// Endpoint pentru actualizarea unui element existent
app.put('/api/gallery/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  // Citirea datelor existente din fișierul JSON
  fs.readFile('gallery.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }

    const gallery = JSON.parse(data);

    // Căutarea elementului în galerie
    const itemIndex = gallery.findIndex((item) => item.id === itemId);

    if (itemIndex === -1) {
      res.status(404).send('Item not found');
      return;
    }

    // Actualizarea elementului
    gallery[itemIndex] = { ...gallery[itemIndex], ...updatedItem };

    // Salvarea datelor actualizate în fișierul JSON
    fs.writeFile('gallery.json', JSON.stringify(gallery), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
        return;
      }

      res.json(gallery[itemIndex]);
    });
  });
});

// Endpoint pentru ștergerea unui element
app.delete('/api/gallery/:id', (req, res) => {
  const itemId = parseInt(req.params.id);

  // Citirea datelor existente din fișierul JSON
  fs.readFile('gallery.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }

    let gallery = JSON.parse(data);

    // Filtrarea elementului de șters
    gallery = gallery.filter((item) => item.id !== itemId);

    // Salvarea datelor actualizate în fișierul JSON
    fs.writeFile('gallery.json', JSON.stringify(gallery), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
        return;
      }

      res.send('Item deleted');
    });
  });
});

// Pornirea serverului
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
