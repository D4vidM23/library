'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Books.belongsToMany(models.Author, {
        through: 'author_books',
        as: 'authors',
        foreignKey: 'book_id',
        otherKey: 'author_id',
        timestamps: false,
      })
    }
  }
  Books.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    publisher: DataTypes.STRING,
    genre: DataTypes.STRING,
    pages: DataTypes.INTEGER,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Book',
    timestamps:false,
    tableName: 'bookcover'
  });
  return Books;
};