const { Category } = require('../models');

const fieldRequired = {
  message: 'Some required fields are missing',
};

const categoryNotFound = {
  message: '"categoryIds" not found',
};

const validateExistentCategory = async (req, res, next) => {
  const { categoryIds } = req.body;
  try {
    const allCategoriesData = await Category.findAll();
    const allCategoriesId = allCategoriesData.map((category) => category.dataValues.id);
    const validation = categoryIds
      .every((id) => allCategoriesId.some((categoryId) => categoryId === id));
    if (!validation) return res.status(400).json(categoryNotFound);
  } catch (error) {
    console.error(error);
  }
  next();
};

const validatePostInfo = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title) return res.status(400).json(fieldRequired);
  if (!content) return res.status(400).json(fieldRequired);
  if (!categoryIds) return res.status(400).json(fieldRequired);
  next();
};

const validatePostInfoUpdate = async (req, res, next) => {
  const { title, content } = req.body;
  if (!title) return res.status(400).json(fieldRequired);
  if (!content) return res.status(400).json(fieldRequired);
  next();
};

module.exports = {
  validatePostInfo,
  validateExistentCategory,
  validatePostInfoUpdate,
};