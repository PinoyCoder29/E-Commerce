const Update_NewPasswordModel = require('../../models/CustomerModel/update_NewPasswordModel')
const hashPassword = require('../../utils/hashedPassword');

const verify_NewPassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return res.status(400).json({
      message: 'All fields are required!',
      success: false
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: 'Passwords do not match.',
      success: false
    });
  }

  try {
    const hash = await hashPassword(password);
    await Update_NewPasswordModel(email, hash);

    return res.status(200).json({
      message: 'Password updated successfully!',
      success: true
    });
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({
      message: 'Something went wrong.',
      success: false,
      error: error.message
    });
  }
};

module.exports = verify_NewPassword