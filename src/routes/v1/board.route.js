const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const boardValidation = require('../../validations/board.validation');
const boardController = require('../../controllers/board.controller');

const router = express.Router();

router
  .route('/')
  .get(validate(boardValidation.getBoards), boardController.getBoards)
  .post(auth(), validate(boardValidation.createBoard), boardController.createBoard);

router
  .route('/:id')
  .get(auth(), validate(boardValidation.getBoard), boardController.getBoardById)
  .patch(auth(), validate(boardValidation.updateBoard), boardController.updateBoard)
  .delete(auth(), validate(boardValidation.getBoard), boardController.deleteBoard);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Board
 *   description: Board Content management
 */

/**
 * @swagger
 * /boards:
 *   get:
 *     summary: Get Board Content
 *     description: get Board Content List
 *     tags: [Board]
 *     security:
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: pageNum
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Page number
 *     responses:
 *       "200":
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contents:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Board'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 totalElements:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 next:
 *                   type: boolean
 *                   example: true
 *                 prev:
 *                   type: boolean
 *                   example: false
 *                 pageList:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   example: [1,2,3,4,5]
 *
 *   post:
 *     summary: Create a Board Content
 *     description: create simple Board Content
 *     tags: [Board]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               thumnail:
 *                 type: string
 *             example:
 *               title: fake title
 *               content: fake content
 *               thumnail: /files/12341234.jpb
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Todo'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /boards/{id}:
 *   get:
 *     summary: Get a Board
 *     description: Get a Board
 *     tags: [Board]
 *     security:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Board id
 *     responses:
 *       "200":
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update a Board Content
 *     description: Update a Board
 *     tags: [Board]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Board Content id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               thumnail:
 *                 type: string
 *             example:
 *               title: fake title
 *               content: fake content
 *               thumnail: /files/12341234.png
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Board'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Board
 *     description: Delete a Board
 *     tags: [Board]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Board id
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */
