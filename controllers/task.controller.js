const Comment = require('../models/Comment');
const Task = require('../models/Task');
const createError = require('http-errors');

module.exports.createTask = async (req, res, next) => {
  try {
    const { body } = req;
    const task = await Task.create(body);
    res.status(201).send({ data: task });
    if (!task) {
      return next(createError(400, 'bad request'));
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getTasks = async (req, res, next) => {
  try {
    // const tasks = await Task.find();
    // const tasks = await Comment.populate(await Comment.find(), {
    //   path: 'task'
    // })
    const tasks = await Task.populate(await Task.find(), {
      path: 'comments'
    })
    if (tasks.length === 0) {
      return next(createError(404, 'no tasks found'));
    }
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};

module.exports.findTask = async (req, res, next) => {
  try {
    const {
      params: { idTask },
    } = req;
    // const task = await Task.findById(idTask);
    const task = await Comment.populate(await Comment.find({task: idTask}), {
      path: 'task'
    })
    if (!task) {
      return next(createError(404, 'task no found'));
    }
    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const {
      params: { idTask },
    } = req;
    const task = await Task.findByIdAndDelete(idTask);
    if (!task) {
      return next(createError(404, 'task no found'));
    }
    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      params: { idTask },
      body,
    } = req;
    const task = await Task.findByIdAndUpdate(idTask, body, { new: true, runValidators: true });
    if (!task) {
      return next(createError(404, 'task no found'));
    }
    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};
