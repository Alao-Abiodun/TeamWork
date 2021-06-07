import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    comment: {
      type: String,
    },
    Date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;
