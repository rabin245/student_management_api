const express = require("express");
const students = require("./routes/students");
const courses = require("./routes/courses");
require("dotenv").config();
const app = express();
const swaggerDocs = require("./swagger");

app.use(express.json());

app.use("/api/students", students);
app.use("/api/courses", courses);

port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
  swaggerDocs(app, port);
});
