import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  article: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

const Article = mongoose.model('Article', ArticleSchema);
export default Article;
