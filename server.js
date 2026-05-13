import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
app.use(express.json());
app.use(express.static("public"));

const db = await open({ filename: "./data.db", driver: sqlite3.Database });

await db.exec(`
  CREATE TABLE IF NOT EXISTS commandes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT,
    produit TEXT,
    quantite INTEGER,
    date TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

app.post("/api/commande", async (req, res) => {
  const { nom, produit, quantite } = req.body;
  await db.run("INSERT INTO commandes (nom, produit, quantite) VALUES (?, ?, ?)", [nom, produit, quantite]);
  res.json({ ok: true });
});

app.get("/api/commandes", async (req, res) => {
  const commandes = await db.all("SELECT * FROM commandes ORDER BY id DESC");
  res.json(commandes);
});

app.listen(3000, () => console.log("http://localhost:3000"));