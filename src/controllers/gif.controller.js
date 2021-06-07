import Gif from '../models/gif.model';
import Comment from '../models/comment.model';

import customError from '../utils/errorHandler';
import responseHandler from '../utils/responseHandler';

exports.createImage = async (req, res, next) => {
  console.log(req.user._id);
  try {
    const { title } = req.body;
    const { image } = req.files;
    image.mv('./uploads/' + '' + image.name);
    const gif = new Gif({
      title,
      image: image.name,
      author: req.user._id,
    });
    const createdGif = await gif.save();
    return responseHandler(
      res,
      201,
      createdGif,
      'GIF image  successfully created'
    );
  } catch (error) {
    console.log(error);
    return next(new customError(500, 'Server Error', error.message));
  }
};

exports.deleteGif = async (req, res, next) => {
  try {
    const { gifId } = req.params;
    const gif = await Gif.findByIdAndDelete({
      _id: gifId,
      author: req.user.id,
    });
    if (!gif) {
      return next(new customError(400, 'The documents does not exist'));
    } else {
      return responseHandler(res, 200, 'gif post successfully deleted');
    }
  } catch (error) {
    console.log(error);
    return next(new customError(500, 'Server Error', error.message));
  }
};

exports.addGifComment = async (req, res, next) => {
  try {
    const { comment } = req.body;
    const { gifId } = req.params;
    const newComment = new Comment({
      comment,
    });
    await newComment.save();
    const result = await Gif.findOne({ _id: gifId, author: req.user.id });
    result.comments.push(newComment);
    await result.save();
    return responseHandler(res, 201, result, 'comment successfully created');
  } catch (error) {
    console.log(error);
    return next(new customError(500, 'Server Error', error.message));
  }
};

exports.getSingleGif = async (req, res, next) => {
  try {
    const { gifId } = req.params;
    const gif = await Gif.findOne({ _id: gifId, author: req.user.id });
    await gif.populate('comments').execPopulate();
    if (!gif) {
      return next(new customError(401, 'error'));
    }
    return responseHandler(res, 201, gif, 'success');
  } catch (error) {
    console.log(error);
    return next(new customError(500, 'Server Error', error.message));
  }
};
