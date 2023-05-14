const Comment = require('../models/Comment');
const Task = require('../models/Task');

module.exports.createComment = async (req, res, next) => {
  try {
    const {
      params: { idTask },
      body,
    } = req;
    const comment = await Comment.create({ ...body, task: idTask });
    await Task.findByIdAndUpdate(idTask, { comments: [comment._id] });
    res.status(201).send({ data: comment });
  } catch (error) {
    next(error);
  }
};

module.exports.getComments = async (req, res, next) => {
  try {
    const commets = await Comment.find().populate('task');
    res.status(201).send({ data: commets });
  } catch (error) {
    next(error);
  }
};

module.exports.updateComment = async (req, res, next) => {
  try {
    const {
      params: { idComment },
      body,
    } = req;
    const updateComment = await Comment.findByIdAndUpdate(idComment, body, { new: true });
    res.status(201).send({ data: updateComment });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteComment = async (req, res, next) => {
  try {
    const {
      params: { idComment },
    } = req;
    const deleteComment = await Comment.findByIdAndDelete(idComment);
    res.status(201).send({ data: deleteComment });
  } catch (error) {
    next(error);
  }
};
