const knex = require("knex");
const knexfile = require("../knexfile");

const db = knex(knexfile.development);

db.raw("SELECT 1")
  .then(() => {
    console.log("Database connected successfully...");
  })
  .catch((e) => {
    console.log("Error while connecting to the database...");
    console.error(e);
    process.exit(1);
  });
module.exports = db;
