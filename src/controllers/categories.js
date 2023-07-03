const { Category } = require('../models');

const validateCategory = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  next();
};

const postCategory = async (req, res) => {
  const { name } = req.body;
  console.log(name);
  try {
    const category = await Category.create({ name });
    return res.status(201).json(category);
  } catch (error) {
    console.log(error);
  }
  res.send(200);
};

const getCategories = async (_req, res) => {
    try {
      const allCategories = await Category.findAll();
      return res.status(200).json(allCategories);
    } catch (error) {
      console.error(error);
    }
  };

module.exports = {
  validateCategory,
  postCategory,
  getCategories,
};