/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("student").del();
  await knex("student").insert([
    {
      id: 1,
      name: "John Cena",
      email: "test@test.com",
      section: "A",
      age: 20,
    },
    {
      id: 2,
      name: "Ram Kumar",
      email: "ram@test.com",
      section: "B",
      age: 22,
    },
    {
      id: 3,
      name: "John Cena ko Vai",
      email: "test@gmail.com",
      section: "C",
      age: 19,
    },
  ]);
};
