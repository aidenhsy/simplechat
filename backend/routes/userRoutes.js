const router = require('express').Router();

const protect = require('../middlewares/authMiddleware');
const {
  register,
  login,
  getProfile,
} = require('../controllers/userControllers');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/profile').get(protect, getProfile);

module.exports = router;
