const courseDAO = require("../dao/courses");

function getAllCourses() {
  return courseDAO.getAllCourses();
}

async function getCourseById(id) {
  const [data] = await courseDAO.getCourseById(id);

  if (!data) {
    throw new Error("Course with given id not found");
  }

  console.log(data);

  return data;
}

async function createCourse(course) {
  const id = await courseDAO.createCourse(course);

  const data = await getCourseById(id);

  return data;
}

async function updateCourse(id, course) {
  await courseDAO.updateCourse(id, course);

  const data = await getCourseById(id);

  return data;
}

async function deleteCourse(id) {
  const data = await getCourseById(id);
  await courseDAO.deleteCourse(id);

  return data;
}

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
