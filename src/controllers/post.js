const jwt = require('jsonwebtoken');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const { BlogPost, Category, User, PostCategory } = require('../models');

const postPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const date = new Date();
  const { authorization: token } = req.headers;
  const { data: { id: userId } } = jwt.decode(token, secret);
  try {
    const newPost = await BlogPost.create({ 
      userId, title, content, updated: date, published: date });
      const postCategories = categoryIds.map((categoryId) => ({
        postId: newPost.id,
        categoryId,
      }));
      await PostCategory.bulkCreate(postCategories);
    return res.status(201).json({ 
      id: newPost.id, userId, title, content, updated: date, published: date });
  } catch (error) {
    console.error(error);
  }
};

const getPosts = async (_req, res) => {
  const blogPost = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return res.status(200).json(blogPost);
};

const getPostbyId = async (req, res) => {
  const { id } = req.params;
  const blogPost = await BlogPost.findOne({
    where: {
      id,
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!blogPost) {
    return res.status(404).json({
      message: 'Post does not exist',
    });
  }
  return res.status(200).json(blogPost);
};

const validateBlogUser = async (req, res, next) => {
  const { authorization: token } = req.headers;
  const { data: { id: userId } } = jwt.decode(token, secret);
  const { id } = req.params;
  const blogPost = await BlogPost.findOne({
    where: {
      id,
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (blogPost.user.id === userId) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized user' });
}; 

const putPostbyId = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const date = new Date();
  await BlogPost.update(
    { title, content, updated: date },
    { where: { id } },
  );
  const blogPost = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return res.status(200).json(blogPost);
};

const postExistence = async (req, res, next) => {
  const { id } = req.params;
  const blogPost = await BlogPost.findOne({
    where: { id },
  });
  if (!blogPost) {
    return res.status(404).json({
      message: 'Post does not exist',
    });
  }
  return next();
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  await BlogPost.destroy({
    where: { id },
  });
  return res.status(204).json();
};

module.exports = {
  postPost,
  getPosts,
  getPostbyId,
  putPostbyId,
  validateBlogUser,
  postExistence,
  deletePost,
};