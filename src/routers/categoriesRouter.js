const express = require('express');

const router = express.Router();

const UserController = require('../controllers/user');
const CategoriesController = require('../controllers/categories');

const { tokenValidation } = UserController;
const { validateCategory, postCategory, getCategories } = CategoriesController;

router.post('/', tokenValidation, validateCategory, postCategory);
router.get('/', tokenValidation, getCategories);

module.exports = router;