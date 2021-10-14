require("dotenv").config();

const express = require("express");
const app = express();

const { PORT } = process.env;

app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/products"))

app.listen(PORT, (req, res) => {
  console.log(`Server listening on port ${PORT}`);
});
