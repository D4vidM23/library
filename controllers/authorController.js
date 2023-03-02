const {Author} = require('../models')

module.exports.viewAll = async function (req, res) {
    const authors = await Author.findAll();
    res.render('authors/view_all', {authors});
}