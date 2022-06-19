const express = require("express");
const courseController = require("../controllers/courses");

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Course:
 *     type: object
 *     properties:
 *      id:
 *       type: integer
 *       description: The id of the course
 *       example: 12
 *     allOf:
 *      - $ref: '#/components/schemas/CreateCourse'
 *   CreateCourse:
 *     type: object
 *     required:
 *     - course_name
 *     - credit_hours
 *     properties:
 *      course_name:
 *       type: string
 *       description: The name of the course
 *       example: Computer Science
 *      credit_hours:
 *       type: float
 *       description: The number of credit hours for the course
 *       example: 40.2
 *
 */

/**
 * @swagger
 * '/api/courses':
 *  get:
 *    summary: Get all courses
 *    description: Returns all the courses
 *    tags:
 *    - Course
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *               $ref: '#/components/schemas/Course'
 *      400:
 *        description: Bad Request
 */
router.get("/", courseController.getAllCourses);

/**
 * @swagger
 * /api/courses/{id}:
 *  get:
 *    summary: Get a course by id
 *    description: Returns a course with given id
 *    tags:
 *    - Course
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The unique identifier for the course
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Course'
 *      500:
 *        description: Something went wrong
 */
router.get("/:id", courseController.getCourseById);

/**
 * @swagger
 * /api/courses:
 *  post:
 *    summary: Create a new course
 *    description: Creates a new course
 *    tags: [Course]
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/CreateCourse'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Course'
 *      500:
 *        description: Something went wrong
 *
 */
router.post("/", courseController.createCourse);

/**
 * @swagger
 * /api/courses/{id}:
 *  put:
 *    summary: Update a course
 *    description: Update an existing course
 *    tags: [Course]
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The unique identifier for the course
 *      required: true
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/CreateCourse'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Course'
 *      500:
 *        description: Something went wrong
 *
 */
router.put("/:id", courseController.updateCourse);

/**
 * @swagger
 * /api/courses/{id}:
 *  delete:
 *    summary: Delete a course
 *    description: Delete a course with given id
 *    tags:
 *    - Course
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The unique identifier for the course
 *      required: true
 *    responses:
 *      200:
 *        description: Successfully deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Course'
 *      500:
 *        description: Something went wrong
 */
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
