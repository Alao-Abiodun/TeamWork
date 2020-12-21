import Article from '../models/article.model';
import Comment from '../models/comment.model';

class ArticleController {
  async createArticle(req, res) {
    try {
      const { title, article } = req.body;
      const articles = new Article({
        title,
        article,
        author: req.user.id,
      });
      const createdArticle = await articles.save();
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'Article successfully posted',
          articleId: createdArticle._id,
          createdOn: Date.now(),
          title: createdArticle.title,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: error,
        error: new Error('Server Error'),
      });
    }
  }

  async updateArticle(req, res) {
    try {
      const updates = Object.keys(req.body);
      const allowedUpdates = ['title', 'article'];
      const isUpdate = updates.every(update => allowedUpdates.includes(update));
      if (!isUpdate) {
        return res.status(401).json({
          status: error,
          data: {
            message: 'The required field is not updated',
          },
        });
      } else {
        const { articleId } = req.params;
        const updatedArticle = await Article.findOneAndUpdate(
          { _id: articleId },
          req.body,
          {
            new: true,
            upsert: true,
          }
        );
        return res.status(200).json({
          status: 'success',
          data: {
            message: 'Article successfully updated',
            title: updatedArticle.title,
            article: updatedArticle.article,
          },
        });
      }
    } catch (error) {}
  }

  async deleteArticle(req, res) {
    try {
      const { articleId } = req.params;
      const article = await Article.findOneAndRemove({ _id: articleId });
      if (!article) {
        return res.status(401).json({
          status: error,
          data: {
            message: 'This id does not exist',
          },
        });
      } else {
        return res.status(200).json({
          status: 'success',
          data: {
            message: 'Article successfully deleted',
          },
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: error,
        data: {
          message: 'Server error',
        },
      });
    }
  }

  async addArticleComment(req, res) {
    try {
      const { comment } = req.body;
      const { articleId } = req.params;
      const newComment = new Comment({
        comment,
      });
      newComment.save();
      const result = await Article.findOne({ _id: articleId });
      result.comments.push(newComment);
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'Comment successfully created',
          createdOn: Date.now(),
          articleTitle: result.title,
          article: result.article,
          comment: result.comments,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: error,
        data: {
          message: 'Server Error',
        },
      });
    }
  }
}

export default new ArticleController();
