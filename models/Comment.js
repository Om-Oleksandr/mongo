const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    bodyComment: {
      type: String,
      required: [true, 'body is required'],
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
