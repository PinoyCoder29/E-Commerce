const comparedPassword = require('../../utils/comparedPassword');
const customerModel = require('../../models/customerModel');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'All fields are required!',
      success: false,
    });
  }

  try {
    const user = await customerModel.getUserByEmail(email); // ✅ added await

    if (!user || !user.password) {
      return res.status(400).json({
        message: 'Invalid email or password',
        success: false,
      });
    }

    const isMatch = await comparedPassword(password, user.password); // ✅ added await

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid email or password',
        success: false,
      });
    }
     const accessToken = jwt.sign(
      { sub: user.id, username: user.username,role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );
    return res.status(200).json({
      message: 'Sign In Successfully',
      success: true,
      token: accessToken
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
};

module.exports = signIn;
