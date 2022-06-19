/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("course").del();
  await knex("course").insert([
    { id: 1, course_name: "Computer Science", credit_hours: 14.2 },
    { id: 2, course_name: "Statistics", credit_hours: 18.2 },
    { id: 3, course_name: "Mathematics", credit_hours: 44.4 },
    { id: 4, course_name: "Statistics II", credit_hours: 28.2 },
    { id: 5, course_name: "Mathematics II", credit_hours: 24 },
  ]);
};
