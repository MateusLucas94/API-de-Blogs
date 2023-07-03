const express = require('express');

const router = express.Router();

const Controller = require('../controllers/user');

const {
    userPost,
    userValidation,
    tokenValidation,
    getUsers,
    getUserbyId,
    deleteUser,
} = Controller;

router.post('/', userValidation, userPost);
router.get('/:id', tokenValidation, getUserbyId);
router.get('/', tokenValidation, getUsers);
router.delete('/me', tokenValidation, deleteUser);

module.exports = router;