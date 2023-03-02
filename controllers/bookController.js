const {Book} = require('../models')
const genres = ['Fiction', 'Science Fiction', 'Non-Fiction', 'Biography', 'Auto-Biography', 'Magazine Article', 'Historical Fiction', 'Mystery', 'Horror']

module.exports.viewAll = async function (req, res) {
    const books = await Book.findAll();
    res.render('book/view_all', {books})
};


module.exports.viewProfile= async function(req, res){
    const book = await Book.findByPk(req.params.id);
    res.render('book/profile', {book})
}

module.exports.renderEditForm = async function (req, res){
    const book = await Book.findByPk(req.params.id);
    res.render('book/edit', {book, genres});
}

module.exports.updateBook = async function (req, res){
    const book = await Book.update({
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        genre: req.body.genre,
        image: req.body.image,
        pages: req.body.pages,
        description: req.body.description
    }, {
        where: {
            id: req.params.id
        }
    });
    res.redirect(`/books/profile/${req.params.id}`);
}


module.exports.renderAddForm = function(req, res){
    const book = {
        title: '',
        author: '',
        publisher: '',
        genre: genres[0],
        image: '',
        pages: '',
        description: '',
    }
    res.render('book/add', {book, genres});
}

module.exports.addBook = async function(req, res){
    const book = await Book.create({
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        genre: req.body.genre,
        image: req.body.image,
        pages: req.body.pages,
        description: req.body.description
    });
    res.redirect(`/books/profile/${book.id}`);
}

module.exports.deleteBook = async function(req, res){
    await Book.destroy({
        where: {
            id:req.params.id
        }
    });
    res.redirect('/books');
}