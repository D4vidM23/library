const {Author} = require('../models')

module.exports.viewAll = async function (req, res) {
    const authors = await Author.findAll();
    res.render('author/view_all', {authors});
}

module.exports.viewProfile = async function (req, res) {
    const author = await Author.findByPk(req.params.id);
    res.render('author/profile', {author})
}

module.exports.renderEditForm = async function(req, res){
    const author = await Author.findByPk(req.params.id);
    res.render('author/edit', {author});
}


module.exports.updateAuthor = async function(req, res){
    const author = await Author.update({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        bookswritten: req.body.bookswritten,
        dob: req.body.dob,
    }, {
        where: {
            id: req.params.id
        }
    });
    res.redirect(`/author/profile/${req.params.id}`)
}

module.exports.renderAddForm = function(req, res){
    const author = {
        firstname: '',
        lastname: '',
        bookswritten: '',
        dob: '',
    }
    res.render('author/add', {author});
}


module.exports.addAuthor = async function(req, res){
    const author = await Author.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        bookswritten: req.body.bookswritten,
        dob: req.body.dob,
    });
    res.redirect(`/authors/profile/${author.id}`);
}

module.exports.deleteAuthor = async function(req, res){
    await Author.destroy({
        where: {
            id:req.params.id
        }
    });
    res.redirect(`/authors`);
}