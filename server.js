import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(express.static(".")); // sert les fichiers du dossier actuel

const DB = "./data.json";
let db = fs.existsSync(DB) ? JSON.parse(fs.readFileSync(DB)) : { commandes: [] };
const save = () => fs.writeFileSync(DB, JSON.stringify(db, null, 2));

app.post("/api/commande", (req, res) => {
  db.commandes.unshift({ id: Date.now(), ...req.body, date: new Date().toISOString() });
  save();
  res.json({ ok: true });
});

app.get("/api/commandes", (req, res) => res.json(db.commandes));

app.listen(3000, () => console.log("Serveur: http://localhost:3000"));
