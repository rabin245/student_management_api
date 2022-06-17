const courseService = require("../services/courses");

async function getAllCourses(req, res) {
  try {
    const data = await courseService.getAllCourses();

    res.status(201).send(data);
  } catch (error) {
    console.log(error);

    res.status(500).send({
      msg: "Something went wrong",
      error: error,
    });
  }
}

async function getCourseById(req, res) {
  try {
    const data = await courseService.getCourseById(req.params.id);

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      msg: "Something went wrong",
      error: error.message,
    });
  }
}

async function createCourse(req, res) {
  try {
    const data = await courseService.createCourse(req.body);

    res.send(data);
  } catch (error) {
    console.log(error);

    res.status(500).send({
      msg: "Something went wrong when creating course",
      error: error,
      test: error.message,
    });
  }
}

async function updateCourse(req, res) {
  try {
    const data = await courseService.updateCourse(req.params.id, req.body);

    res.send(data);
  } catch (error) {
    console.log(error);

    res.status(500).send({
      msg: "Something went wrong when updating course",
      error: error,
      errmsg: error.message,
    });
  }
}

async function deleteCourse(req, res) {
  try {
    const data = await courseService.deleteCourse(req.params.id);

    res.send(data);
  } catch (error) {
    console.log(error);

    res.status(500).send({
      msg: "Something went wrong when deleting course",
      error: error.message,
    });
  }
}

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
