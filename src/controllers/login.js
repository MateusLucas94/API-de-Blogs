const jwt = require('jsonwebtoken');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const {
  validateEmailInfo,
  validatePasswordInfo } = require('../services/login');

  const { User } = require('../models');

const validateLoginInfo = (email, password) => {
  if (validateEmailInfo(email) !== 200) {
    return {
        status: validateEmailInfo(email).status,
        message: validateEmailInfo(email).message,
    };
  }
  if (validatePasswordInfo(password) !== 200) {
    return {
        status: validatePasswordInfo(password).status,
        message: validatePasswordInfo(password).message,
    };
  }
  return {
    status: 200,
  };
};

const loginValidation = async (req, res, next) => {
  const { email, password } = req.body;
  const validation = validateLoginInfo(email, password);
  if (validation.status !== 200) {
    return res.status(validation.status).json({
        message: validation.message,
    });
  }
  try {
    const [user] = await User.findAll({ where: { email } });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
  } catch (error) {
    console.error(error);
  }
  next();
};

const loginPost = async (req, res) => {
  try {
    const { dataValues } = await User.findOne({ where: { email: req.body.email } });
    const token = jwt.sign({ data: dataValues }, secret, jwtConfig);
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loginValidation,
  loginPost,
};