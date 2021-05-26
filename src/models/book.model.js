import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  author: String,
  description: String,
  category: {
    type: String,
    enum: ['novel', 'blog', 'fiction', 'non-fiction'],
  },
});

const Book = mongoose.model('Book', bookSchema);
export default Book;
