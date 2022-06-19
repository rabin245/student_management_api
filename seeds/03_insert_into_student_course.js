/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("student_course").del();
  await knex("student_course").insert([
    { id: 1, student_id: 1, course_id: 1 },
    { id: 2, student_id: 1, course_id: 2 },
    { id: 3, student_id: 1, course_id: 3 },

    { id: 4, student_id: 2, course_id: 2 },
    { id: 5, student_id: 2, course_id: 4 },

    { id: 6, student_id: 3, course_id: 5 },
  ]);
};
