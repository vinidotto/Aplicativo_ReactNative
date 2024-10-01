const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, login TEXT, password TEXT, city TEXT)"
  );
});

app.get("/", (req, res) => {
  res.send("API de CRUD de Usuários está rodando.");
});


app.post("/users", (req, res) => {
  const { name, email, login, password, city } = req.body;
  const query = "INSERT INTO users (name, email, login, password, city) VALUES (?, ?, ?, ?, ?)";
  db.run(query, [name, email, login, password, city], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name, email, login, city });
  });
});

app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(row);
  });
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, login, password, city } = req.body;
  const query = "UPDATE users SET name = ?, email = ?, login = ?, password = ?, city = ? WHERE id = ?";
  db.run(query, [name, email, login, password, city, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json({ message: "Usuário atualizado com sucesso." });
  });
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM users WHERE id = ?";
  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json({ message: "Usuário deletado com sucesso." });
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://192.168.1.109:${PORT}`);

});