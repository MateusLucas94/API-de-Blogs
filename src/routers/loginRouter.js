const express = require('express');

const router = express.Router();

const Controller = require('../controllers/login');

const { loginValidation, loginPost } = Controller;

router.post('/', loginValidation, loginPost);

module.exports = router;