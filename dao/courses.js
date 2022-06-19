const db = require("../db/db");

async function getAllCourses() {
  return await db.select().from("course");
}

async function getCourseById(id) {
  return await db
    .select("id", "course_name", "credit_hours")
    .from("course")
    .where("id", id);
}

async function createCourse(course) {
  const [result] = await db
    .insert(
      {
        course_name: course.course_name,
        credit_hours: course.credit_hours,
      },
      "id"
    )
    .into("course");

  return result.id;
}

async function updateCourse(id, course) {
  await db("course").where("id", id).update(course);

  return;
}

async function deleteCourse(id) {
  try {
    const trx = await db.transaction();

    await trx("student_course").where("course_id", id).del();

    await trx("course").where("id", id).del();

    await trx.commit();

    return;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
