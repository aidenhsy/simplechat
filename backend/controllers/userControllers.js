const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const generateToken = require('../util/generateToken');

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existUser = await User.findOne({ email });
  if (existUser) {
    res.status('401');
    throw new Error('User already exists.');
  }
  const newUser = await User.create({ name, email, password });
  res.json({
    token: generateToken(newUser._id),
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user._name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const getProfile = asyncHandler(async (req, res) => {
  const data = req.user;
  res.json(data);
});

module.exports = { register, login, getProfile };
