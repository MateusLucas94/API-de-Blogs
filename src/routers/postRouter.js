const express = require('express');

const { tokenValidation } = require('../controllers/user');
const { 
  postPost,
  getPosts,
  getPostbyId,
  putPostbyId,
  validateBlogUser,
  deletePost,
  postExistence,
 } = require('../controllers/post');
const { validatePostInfo,
  validateExistentCategory,
  validatePostInfoUpdate,
  } = require('../services/post');
// teste de validação de rota
const router = express.Router();

router.post('/', tokenValidation, validatePostInfo, validateExistentCategory, postPost);
router.get('/:id', tokenValidation, getPostbyId);
router.get('/', tokenValidation, getPosts);
router.put('/:id', tokenValidation, validatePostInfoUpdate, validateBlogUser, putPostbyId);
router.delete('/:id', tokenValidation, postExistence, validateBlogUser, deletePost);

module.exports = router;