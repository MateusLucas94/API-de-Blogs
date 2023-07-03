const jwt = require('jsonwebtoken');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const {
  validateName,
  validateEmailInfo,
  validatePasswordInfo } = require('../services/user');

const { User } = require('../models');

const validateInfo = (name, email, password, res) => {
  if (validateName(name) !== 200) {
    return res.status(validateName(name).status)
      .json(validateName(name).message); 
  }
  if (validateEmailInfo(email) !== 200) {
    return res.status(validateEmailInfo(email).status)
      .json(validateEmailInfo(email).message);
  }
  if (validatePasswordInfo(password) !== 200) {
    return res.status(validatePasswordInfo(password).status)
      .json(validatePasswordInfo(password).message);
  }
};

const userValidation = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  validateInfo(displayName, email, password, res);
  try {
    const user = await User.findAll({ where: { email } });
    if (user.length > 0) {
      return res.status(409).json({
        message: 'User already registered',
      });
    }
  } catch (error) {
    console.error(error);
  }
  next();
};

const tokenValidation = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    const user = await User.findOne({ where: { email: decoded.data.email } });
    if (!user) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
};

const getUsers = async (_req, res) => {
  try {
    const allUsers = await User.findAll({
      attributes: ['id', 'displayName', 'email', 'image'],
    });
    return res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
  }
};

const userPost = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    const user = await User.create({ displayName, email, password, image });
    const token = jwt.sign({ data: user.dataValues }, secret, jwtConfig);
    return res.status(201).json({ token });
  } catch (error) {
    console.log(error);
  }
};

const getUserbyId = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
    if (!user) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(user.dataValues);
  } catch (error) {
    return res.status(400);
  }
};

const deleteUser = async (req, res) => {
  const { authorization: token } = req.headers;
  const { data: { id: userId } } = jwt.decode(token, secret);
  await User.destroy({
    where: { id: userId },
  });
  return res.status(204).json();
};

module.exports = {
  userPost,
  userValidation,
  tokenValidation,
  getUsers,
  getUserbyId,
  deleteUser,
};