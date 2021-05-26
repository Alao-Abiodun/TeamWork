import Book from '../models/book.model';

exports.createNewBook = async (req, res) => {
  try {
    const { title, author, description, category } = req.body;
    const newBook = new Book({ title, author, description, category });
    await newBook.save();
    return res.status(201).json({
      message: 'Book created',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'server error',
    });
  }
};
