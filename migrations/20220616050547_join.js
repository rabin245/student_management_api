/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("student_course", (table) => {
    table.increments("id").primary();
    table.integer("student_id").references("student.id");
    table.integer("course_id").references("id").inTable("course");
    table.unique(["student_id", "course_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("student_course");
};
