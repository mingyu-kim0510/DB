const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const mp = require('../../middlewares/mp');

const boardValidation = require('../../validations/board.validation');
const boardController = require('../../controllers/board.controller');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const todoValidation = require('../../validations/todo.validation');
const todoController = require('../../controllers/todo.controller');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const rootRouter = express.Router();
const boardRouter = express.Router();
const authRouter = express.Router();
const todoRouter = express.Router();
const userRouter = express.Router();

boardRouter.post('/list', mp, validate(boardValidation.getBoards), boardController.getBoards);
boardRouter.post('/info', mp, auth(), validate(boardValidation.getBoard), boardController.getBoardById);
boardRouter.post('/regist', mp, auth(), validate(boardValidation.createBoard), boardController.createBoard);
boardRouter.post('/update', mp, auth(), validate(boardValidation.updateBoard), boardController.updateBoard);
boardRouter.post('/delete', mp, auth(), validate(boardValidation.getBoard), boardController.deleteBoard);

authRouter.post('/register', mp, validate(authValidation.register), authController.register);
authRouter.post('/login', mp, validate(authValidation.login), authController.login);
authRouter.post('/logout', mp, validate(authValidation.logout), authController.logout);
authRouter.post('/session/login', mp, validate(authValidation.login), authController.sessionLogin);
authRouter.post('/session/logout', mp, authController.sessionLogout);
authRouter.post('/refresh-tokens', mp, validate(authValidation.refreshTokens), authController.refreshTokens);
authRouter.post('/forgot-password', mp, validate(authValidation.forgotPassword), authController.forgotPassword);
authRouter.post('/reset-password', mp, validate(authValidation.resetPassword), authController.resetPassword);
authRouter.post('/get-session', mp, auth(), authController.getSession);

todoRouter.post('/list', mp, auth(), todoController.getTodos);
todoRouter.post('/regist', mp, auth(), validate(todoValidation.createTodo), todoController.createTodo);
todoRouter.post('/update', mp, auth(), validate(todoValidation.updateTodo), todoController.updateTodo);
todoRouter.post('/delete', mp, auth(), validate(todoValidation.getTodo), todoController.deleteTodo);

userRouter.post('/regist', mp, auth(), validate(userValidation.createUser), userController.createUser);
userRouter.post('/info', mp, auth(), validate(userValidation.getUser), userController.getUser);
userRouter.post('/update', mp, auth(), validate(userValidation.updateUser), userController.updateUser);

rootRouter.use('/boards', boardRouter);
rootRouter.use('/auth', authRouter);
rootRouter.use('/todos', todoRouter);
rootRouter.use('/users', userRouter);

module.exports = rootRouter;

/**
 * @swagger
 * tags:
 *   name: MorpheusProxy
 *   description: Morpheus GW 기본 규격 / 파라미터 동일
 */

/**
 * @swagger
 * /mp/auth/register:
 *   post:
 *     summary: Register as user
 *     tags: [MorpheusProxy]
 * /mp/auth/login:
 *   post:
 *     summary: Login
 *     tags: [MorpheusProxy]
 * /mp/auth/logout:
 *   post:
 *     summary: Logout
 *     tags: [MorpheusProxy]
 * /mp/auth/refresh-tokens:
 *   post:
 *     summary: Refresh auth tokens
 *     tags: [MorpheusProxy]
 * /mp/auth/forgot-password:
 *   post:
 *     summary: Forgot password
 *     description: An email will be sent to reset password.
 *     tags: [MorpheusProxy]
 * /mp/auth/reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [MorpheusProxy]
 * /mp/auth/session/login:
 *   post:
 *     summary: Login
 *     tags: [MorpheusProxy]
 * /mp/auth/session/logout:
 *   post:
 *     summary: Logout
 *     tags: [MorpheusProxy]
 * /mp/auth/get-session:
 *   post:
 *     summary: Get Session Info
 *     tags: [MorpheusProxy]
 */

/**
 * @swagger
 * /mp/boards/list:
 *   post:
 *     summary: Get Board Content
 *     description: get Board Content List
 *     tags: [MorpheusProxy]
 * /mp/boards/regist:
 *   post:
 *     summary: Create a Board Content
 *     description: create simple Board Content
 *     tags: [MorpheusProxy]
 * /mp/boards/info:
 *   post:
 *     summary: Get a Board
 *     description: Get a Board
 *     tags: [MorpheusProxy]
 * /mp/boards/update:
 *   post:
 *     summary: Update a Board Content
 *     description: Update a Board
 *     tags: [MorpheusProxy]
 * /mp/boards/delete:
 *   post:
 *     summary: Delete a Board
 *     description: Delete a Board
 *     tags: [MorpheusProxy]
 */

/**
 * @swagger
 * /mp/todos/list:
 *   post:
 *     summary: Get Todos By User Id
 *     description: get Todo List
 *     tags: [MorpheusProxy]
 * /mp/todos/regist:
 *   post:
 *     summary: Create a Todo
 *     description: create simple todo
 *     tags: [MorpheusProxy]
 * /mp/todos/update:
 *   post:
 *     summary: Update a todo
 *     description: Update a todo
 *     tags: [MorpheusProxy]
 * /mp/todos/delete:
 *   post:
 *     summary: Delete a todo
 *     description: Delete a todo
 *     tags: [MorpheusProxy]
 */

/**
 * @swagger
 * /mp/users/regist:
 *   post:
 *     summary: Create a user
 *     description: Only admins can create other users.
 *     tags: [MorpheusProxy]
 * /mp/users/info:
 *   post:
 *     summary: Get a user
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [MorpheusProxy]
 * /mp/users/update:
 *   post:
 *     summary: Update a user
 *     description: Logged in users can only update their own information. Only admins can update other users.
 *     tags: [MorpheusProxy]
 */
