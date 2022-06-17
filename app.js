const express = require("express");
const students = require("./routes/students");
require("dotenv").config();
const app = express();

app.use(express.json());

app.use("/students", students);

port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}...`));
