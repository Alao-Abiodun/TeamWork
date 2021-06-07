import Article from '../models/article.model';
import Comment from '../models/comment.model';
import Gifs from '../models/gif.model';

import customError from '../utils/errorHandler';
import responseHandler from '../utils/responseHandler';

exports.createArticle = async (req, res, next) => {
  try {
    const { title, article } = req.body;
    const articles = new Article({
      title,
      article,
      author: req.user._id,
    });
    const createdArticle = await articles.save();
    return responseHandler(
      res,
      201,
      createdArticle,
      'Article successfully posted'
    );
  } catch (error) {
    console.log(error);
    return next(new customError(500, 'Server Error', error.message));
  }
};

exports.updateArticle = async (req, res, next) => {
  try {
    const updates = Object.keys(req.body);
    console.log(updates);
    const allowedUpdates = ['title', 'article'];
    const isUpdate = updates.every(update => allowedUpdates.includes(update));
    console.log(isUpdate);
    if (!isUpdate) {
      return next(new customError(401, 'The required field is not updated'));
    } else {
      const { articleId } = req.params;
      const updatedArticle = await Article.findOneAndUpdate(
        { _id: articleId, author: req.user._id },
        req.body,
        {
          new: true,
          upsert: true,
        }
      );
      return responseHandler(
        res,
        200,
        { updatedArticle },
        'Article successfully updated'
      );
    }
  } catch (error) {
    console.log(error);
    return next(new customError(500, 'Server Error', error.message));
  }
};

exports.deleteArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const article = await Article.findOneAndRemove({
      _id: articleId,
      author: req.user._id,
    });
    if (articleId !== article.author)
      return next(
        new customError(
          401,
          'The Id does not correspond with the author verification Id'
        )
      );
    if (!article) {
      return next(new customError(401, 'Invalid id'));
    } else {
      return responseHandler(res, 200, 'Article successfully deleted');
    }
  } catch (error) {
    return next(new customError(500, 'Server Error', error.message));
  }
};

exports.addArticleComment = async (req, res, next) => {
  try {
    const { comment } = req.body;
    const { articleId } = req.params;
    if (!articleId) return next(new customError(401, 'Invalid ID'));
    const newComment = new Comment({
      comment,
    });
    await newComment.save();
    const result = await Article.findOne({
      _id: articleId,
      author: req.user._id,
    });
    if (!result.author)
      next(new customError(404, 'The user with the ID does not exist'));
    result.comments.push(newComment);
    await result.save();
    return responseHandler(res, 201, result, 'comment successfully created');
  } catch (error) {
    console.log(error);
    return next(new customError(500, 'Server Error', error.message));
  }
};

exports.getFeeds = async (req, res, next) => {
  try {
    const articles = await Article.find({});
    const gifs = await Gifs.find({});
    const allPosts = articles.concat(gifs);
    allPosts.sort((a, b) => {
      let x = new Date(a.Date),
        y = new Date(b.Date);
      return y - x;
    });
    return responseHandler(res, 200, allPosts, 'feed retrieved successfully');
  } catch (error) {
    console.log(error);
    return next(new customError(500, 'Server Error', error.message));
  }
};

exports.getSingleArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const article = await Article.findById({
      _id: articleId,
      author: req.user._id,
    });
    await article.populate('comments').execPopulate();
    if (!article) {
      return next(new customError(401, 'unable to retrieve the article'));
    }
    return responseHandler(res, 200, article, 'A single article is retrieved');
  } catch (error) {
    console.log(error);
    return next(new customError(500, 'Server Error', error.message));
  }
};
