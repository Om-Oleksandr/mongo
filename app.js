const express = require('express');
const TaskController = require('./controllers/task.controller');
const CommentController = require('./controllers/comment.controller');
const { handleError } = require('./middlewares/error.handler');
const app = express();

app.use(express.json());
app.get('/tasks', TaskController.getTasks);
app.get('/tasks/:idTask', TaskController.findTask);
app.delete('/tasks/:idTask', TaskController.deleteTask);
app.put('/tasks/:idTask', TaskController.updateTask);
app.post('/tasks', TaskController.createTask);

app.post('/tasks/:idTask/comments', CommentController.createComment);

app.put('/tasks/:idTask/comments/:idComment', CommentController.updateComment);
app.delete('/tasks/:idTask/comments/:idComment', CommentController.deleteComment);

app.get('/comments', CommentController.getComments);

app.use(handleError);

module.exports = app;
