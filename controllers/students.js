const studentService = require("../services/students");

async function getAllStudents(req, res) {
  try {
    const data = await studentService.getAllStudents();

    res.status(201).send(data);
  } catch (error) {
    console.log(error);

    res.status(500).send({
      msg: "Something went wrong",
      error: error,
    });
  }
}

async function getStudentById(req, res) {
  try {
    const data = await studentService.getStudentById(req.params.id);

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      msg: "Something went wrong",
      error: error.message,
    });
  }
}

async function createStudent(req, res) {
  try {
    const data = await studentService.createStudent(req.body);

    res.send(data);
  } catch (error) {
    console.log(error);

    res.status(500).send({
      msg: "Something went wrong when creating student",
      error: error,
      test: error.message,
    });
  }
}

async function updateStudent(req, res) {
  try {
    const data = await studentService.updateStudent(req.params.id, req.body);

    res.send(data);
  } catch (error) {
    console.log(error);

    res.status(500).send({
      msg: "Something went wrong when updating student",
      error: error,
      errmsg: error.message,
    });
  }
}

async function deleteStudent(req, res) {
  try {
    const data = await studentService.deleteStudent(req.params.id);

    res.send(data);
  } catch (error) {
    console.log(error);

    res.status(500).send({
      msg: "Something went wrong when deleting student",
      error: error.message,
    });
  }
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
