const studentDAO = require("../dao/students");

function getAllStudents() {
  return studentDAO.getAllStudents();
}

async function getStudentById(id) {
  const [data] = await studentDAO.getStudentById(id);

  if (!data) {
    throw new Error("Student with given id not found");
  }

  console.log(data);

  return data;
}

async function createStudent(student) {
  const id = await studentDAO.createStudent(student);
  console.log(id);

  const data = await getStudentById(id);
  console.log(data);
  return data;
}

async function updateStudent(id, student) {
  await studentDAO.updateStudent(id, student);

  const data = await getStudentById(id);
  console.log(data);

  return data;
}

async function deleteStudent(id) {
  const data = await getStudentById(id);
  await studentDAO.deleteStudent(id);

  return data;
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
