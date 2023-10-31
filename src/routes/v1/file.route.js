const express = require('express');
const validate = require('../../middlewares/validate');
const fileValidation = require('../../validations/file.validation');
const fileController = require('../../controllers/file.controller');
// const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/upload', [/*auth(),*/ validate(fileValidation.fileUpload)], fileController.uploadFile);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: Upload File
 */

/**
 * @swagger
 * /file/upload:
 *   post:
 *     summary: Upload File
 *     description: Upload File Then get Url Path.
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 path:
 *                   type: string
 *                 fullpath:
 *                   type: string
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
