const httpStatus = require('http-status');
const _merge = require('lodash/merge');
const catchAsync = require('../utils/catchAsync');
const { boardService } = require('../services');

const createBoard = catchAsync((req, res) => {
  const board = boardService.createBoard(req.user.id, req.body);
  res.send(board);
});

const getBoards = catchAsync((req, res) => {
  const options = _merge(req.body, req.query);
  const boards = boardService.getBoards(options);
  res.send(boards);
});

const getBoardById = catchAsync((req, res) => {
  const board = boardService.getBoardById(req.params.id);
  board.writeable = req.user ? req.user.id === board.writer.id : false;
  res.send(board);
});

const updateBoard = catchAsync((req, res) => {
  const board = boardService.updateBoardById(req.params.id, req.user.id, req.body);
  res.send(board);
});

const deleteBoard = catchAsync((req, res) => {
  boardService.deleteBoardById(req.params.id, req.user.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
};
