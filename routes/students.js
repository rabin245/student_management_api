const express = require("express");
const studentController = require("../controllers/students");

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Student:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The id of the student
 *          example: 1
 *        name:
 *          type: string
 *          description: The name of the student
 *          example: John Cena
 *        email:
 *          type: string
 *          description: The email of the student
 *          example: test@test.com
 *        section:
 *          type: string
 *          description: The section student belongs to
 *          example: A
 *        age:
 *          type: integer
 *          description: The age of the student
 *          example: 21
 *        courses:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *                description: The id of the course
 *                example: 1
 *            allOf:
 *              - $ref: '#/components/schemas/CreateCourse'
 *          description: The list of courses the student is enrolled in
 *          example: [{id: 1, title: "Computer Science", credit_hours: 14.2}]
 *    CreateStudent:
 *      type: object
 *      required:
 *      - name
 *      - email
 *      - section
 *      - age
 *      - courses
 *      properties:
 *        name:
 *          type: string
 *          description: The name of the student
 *          example: John Cena
 *        email:
 *          type: string
 *          description: The email of the student
 *          example: test@test.com
 *        section:
 *          type: string
 *          description: The section student belongs to
 *          example: A
 *        age:
 *          type: integer
 *          description: The age of the student
 *          example: 21
 *        courses:
 *          type: array
 *          items:
 *            type: integer
 *          description: The id of the courses the student is enrolled in
 *          example: [1,2,3]
 */

/**
 * @swagger
 * /api/students:
 *  get:
 *    summary: Get all students
 *    description: Returns all the students
 *    tags:
 *    - Student
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Student'
 *      400:
 *        description: Bad Request
 */
router.get("/", studentController.getAllStudents);

/**
 * @swagger
 * /api/students/{id}:
 *  get:
 *    summary: Get a student by id
 *    description: Returns a student with given id
 *    tags:
 *    - Student
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The unique identifier for the student
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Student'
 *      500:
 *        description: Something went wrong
 */
router.get("/:id", studentController.getStudentById);

/**
 * @swagger
 * /api/students:
 *  post:
 *    summary: Create a new student
 *    description: Creates a new student
 *    tags: [Student]
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/CreateStudent'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Student'
 *      500:
 *        description: Something went wrong
 *
 */
router.post("/", studentController.createStudent);

/**
 * @swagger
 * /api/students/{id}:
 *  put:
 *    summary: Update a student
 *    description: Update an existing student
 *    tags: [Student]
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The unique identifier for the student
 *      required: true
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/CreateStudent'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Student'
 *      500:
 *        description: Something went wrong
 *
 */
router.put("/:id", studentController.updateStudent);

/**
 * @swagger
 * /api/students/{id}:
 *  delete:
 *    summary: Delete a student
 *    description: Delete a student with given id
 *    tags:
 *    - Student
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The unique identifier for the student
 *      required: true
 *    responses:
 *      200:
 *        description: Successfully deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Student'
 *      500:
 *        description: Something went wrong
 */
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
