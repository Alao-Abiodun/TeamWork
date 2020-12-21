import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const GifSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
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

const Gif = mongoose.model('Gif', GifSchema);
export default Gif;
