import express from "express";

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send("Welcome to MCSME App!")
})

app.listen(port, () => {
  console.log(`Open on http://localhost:${port}`)
})