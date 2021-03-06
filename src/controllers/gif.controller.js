import Gif from '../models/gif.model';
import Comment from '../models/comment.model';

class GifController {
  async createImage(req, res) {
    try {
      const { title } = req.body;
      const { image } = req.files;
      image.mv('./uploads/' + '' + image.name);
      const gif = new Gif({
        title,
        image: image.name,
        author: req.user.id,
      });
      const createdGif = await gif.save();
      return res.status(200).json({
        status: 'success',
        data: {
          gifId: createdGif._id,
          message: 'GIF image successfully created',
          createdOn: Date.now,
          title: createdGif.title,
          imageUrl: createdGif.image,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: error,
        error: new Error('Server Error'),
      });
    }
  }

  async deleteGif(req, res) {
    try {
      const { gifId } = req.params;
      const gif = await Gif.findByIdAndDelete({
        _id: gifId,
        author: req.user.id,
      });
      if (!gif) {
        return res.status(400).json({
          status: 'error',
          data: {
            message: 'There is no such documents that exists',
          },
        });
      } else {
        return res.status(200).json({
          status: 'success',
          data: {
            message: 'gif post successfully deleted',
          },
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: error,
        data: {
          message: 'Server Error',
        },
      });
    }
  }

  async addGifComment(req, res) {
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
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'Comment successfully created',
          createdOn: Date.now(),
          gifTitle: result.title,
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

  async getSingleGif(req, res) {
    try {
      const { gifId } = req.params;
      const gif = await Gif.findOne({ _id: gifId, author: req.user.id });
      await gif.populate('comments').execPopulate();
      if (!gif)
        return res.status(401).json({
          status: 'error',
        });
      return res.status(200).json({
        status: 'success',
        data: {
          gif,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: error,
        data: {
          message: 'Server Error',
        },
      });
    }
  }
}

export default new GifController();
