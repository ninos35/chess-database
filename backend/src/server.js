const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
app.use(cors());


app.use(express.json());

const { Client } = require("pg");

//connect to your local database
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5433,
    password: "bazepodataka",
    database: "SahovskaBaza",
});

client.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
    } else {
        console.log('Connected to the database');
    }
});
app.get("/games", (req, res) => {
    client.query(
        "SELECT * from game",
        (err, dbRes) => {
            if (!err) {
                res.status(200).json(dbRes.rows);
            } else {
                console.log(err.message);
                res.status(404).json();
            }
        }
    );
});

app.post("/newgame",async (req,res)=>{
    try {
    const {
      white,
      black,
      white_elo,
      black_elo,
      result,
      date,
      info,
      moves,
      pgn,
      fen,
    } = req.body;

    const query = `
      INSERT INTO Game 
      (white, black, white_elo, black_elo, result, date, game_data, moves, moves_pgn, moves_fen)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *;
    `;

    const values = [
      white,
      black,
      white_elo,
      black_elo,
      result,
      date,
      info,        
      moves, 
      pgn,
      fen,
    ];

    const resultQuery = await client.query(query, values);
    res.status(201).json(resultQuery.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});
const PORT = 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
