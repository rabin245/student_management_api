const db = require("../db/db");

async function getAllStudents() {
  return await db
    .select(
      "student.id",
      "student.name",
      "student.email",
      "student.section",
      // "student.age",
      // "student.created_at",
      // db.raw("json_object_agg (course.id, course.course_name) as courses")
      // db.raw("json_agg ( course.course_name) as courses")
      // db.raw("array_agg (course.course_name) as courses")
      db.raw(
        "json_agg(json_build_object('id', course.id, 'title', course.course_name, 'credit_hours', course.credit_hours)) as courses"
      )
    )
    .from("student")
    .join("student_course", { "student.id": "student_course.student_id" })
    .join("course", { "student_course.course_id": "course.id" })
    .groupBy("student.id")
    .orderBy("student.id");
}

async function getStudentById(id) {
  return await db
    .select(
      "student.id",
      "student.name",
      "student.email",
      "student.section",
      db.raw(
        "json_agg(json_build_object('id', course.id, 'title', course.course_name, 'credit_hours', course.credit_hours)) as courses"
      )
    )
    .from("student")
    .join("student_course", { "student.id": "student_course.student_id" })
    .join("course", { "student_course.course_id": "course.id" })
    .where("student.id", id)
    .groupBy("student.id");
}

async function createStudent(student) {
  try {
    const trx = await db.transaction();

    const [res] = await trx("student").insert(
      {
        name: student.name,
        email: student.email,
        section: student.section,
        age: student.age,
      },
      "id"
    );
    // .returning("id");
    const courseStudentInserts = [];

    student.courses.forEach((courseId) => {
      courseStudentInserts.push({
        student_id: res.id,
        course_id: courseId,
      });
    });

    const res2 = await trx("student_course").insert(courseStudentInserts);
    // console.log("studcourse inserts", courseStudentInserts);
    // console.log(res2);

    await trx.commit();

    return res.id;
  } catch (error) {
    throw error;
  }
}

async function updateStudent(id, student) {
  try {
    console.log("update start");
    const trx = await db.transaction();

    const dataTest = await trx("student")
      .where("id", id)
      .update({
        name: student.name,
        email: student.email,
        section: student.section,
        age: student.age,
      })
      .returning("*");

    if (dataTest.length === 0) return;

    let [oldCourseIds] = await trx("student_course")
      .select(db.raw("array_agg(course_id) as course_ids"))
      .where("student_id", id);
    oldCourseIds = oldCourseIds.course_ids;

    const newCourseIds = student.courses;
    const toInsertCourses = [];
    const toDeleteCourses = [];

    newCourseIds.forEach((courseId) => {
      if (!oldCourseIds.includes(courseId)) {
        toInsertCourses.push(
          trx("student_course").insert({
            student_id: id,
            course_id: courseId,
          })
        );
      }
    });

    oldCourseIds.forEach((courseId) => {
      if (!newCourseIds.includes(courseId)) {
        toDeleteCourses.push(
          trx("student_course")
            .where("student_id", id)
            .where("course_id", courseId)
            .del()
        );
      }
    });

    await Promise.all(toInsertCourses);
    await Promise.all(toDeleteCourses);

    await trx.commit();

    return;
  } catch (error) {
    throw error;
  }
}

async function deleteStudent(id) {
  try {
    const trx = await db.transaction();

    await trx("student_course").where("student_id", id).del();

    await trx("student").where("id", id).del();

    await trx.commit();

    return;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
